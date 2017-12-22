// ==================
// DOM ELEMENTS
// ==================

const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  hitButton: document.getElementById('action-hit'),
  standButton: document.getElementById('action-stand')
};

// ==================
// GAME FIELDS
// ==================

const dealerDialogManager = new DialogManager(domElements.chipDialog);

let deck = new Deck();

let playerHand = null;
let playerHandDisplay = null;

let dealerHand = null;
let dealerHandDisplay = null;

// ==================
// MAIN GAME LOGIC
// ==================

const startRound = () => {

  playerHand = new Hand();
  playerHandDisplay = new HandDisplay(playerHand, domElements.playerHand);
  playerHandDisplay.refreshHand();

  dealerHand = new Hand();
  dealerHandDisplay = new HandDisplay(dealerHand, domElements.dealerHand);
  dealerHandDisplay.refreshHand();

  function handlePlayerMove(playerMove)
  {
    switch(playerMove)
    {
      case PlayerMove.Hit:
        hit();
        break;

      case PlayerMove.Stand:
        stand();
        break;
    }
  };

  function hit()
  {
    sequence([
      dealPlayerCard,
      refreshPlayerHandDisplay
    ]);
  };

  function stand()
  {
    sequence([
      revealDealerHoleCardOrDeal,
      refreshDealerHandDisplay
    ]);
  };

  sequence([

      chip("Hiya! My name's *Chip*! Let's play some *Blackjack*!"),

      chip("First, I'll deal you a card."),
      dealPlayerCard,
      refreshPlayerHandDisplay,

      chip("Next, I'll deal myself a card."),
      dealDealerFaceUpCard,
      refreshDealerHandDisplay,

      chip("And another for you!"),
      dealPlayerCard,
      refreshPlayerHandDisplay,

      chip("And one more for me, but this one face down! *No peeking!*"),
      dealDealerHoleCard,
      refreshDealerHandDisplay,

      scoreOpeningHands,
      handleRoundEnd,

      chip("Do you want to hit or stand?"),
      getPlayerMove,

      handlePlayerMove

  ]);

};

// ==================
// SHORTCUT FUNCTIONS
// ==================

const chip = (message) => {
  return () => (dealerDialogManager.outputMessage(message));
};

const dealPlayerCard = () => {
  playerHand.takeCard(deck.dealFaceUpCard());
};

const dealDealerFaceUpCard = () => {
  dealerHand.takeCard(deck.dealFaceUpCard());
};

const dealDealerHoleCard = () => {
  dealerHand.takeCard(deck.dealFaceDownCard());
};

const revealDealerHoleCardOrDeal = () => {
  if(!dealerHand.cards[1].isFaceUp)
  {
    // First, reveal the dealer's hole card
    revealDealerHoleCard();
  }
  else
  {
    // After revealing the hole card, draw a face-up card
    dealDealerFaceUpCard();
  }
};

const revealDealerHoleCard = () => {
  dealerHand.cards[1].isFaceUp = true;
};

const refreshPlayerHandDisplay = () => {
  playerHandDisplay.refreshHand();
};

const refreshDealerHandDisplay = () => {
  dealerHandDisplay.refreshHand();
};

const scoreOpeningHands = () => {

  if(dealerHand.getPipTotal(true) === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.DealerWins,
      roundEndCondition: RoundEndCondition.NaturalBlackjack
    };
  }

  if(playerHand.getPipTotal() === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.PlayerWins,
      roundEndCondition: RoundEndCondition.NaturalBlackjack
    };
  }

  return {
    isRoundOver: false
  };

};

const scoreHands = () => {

  if(playerHand.getPipTotal() === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.PlayerWins,
      roundEndCondition: RoundEndCondition.Blackjack
    };
  }

  if(playerHand.getPipTotal() > 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.DealerWins,
      roundEndCondition: RoundEndCondition.Busted
    };
  }

  if(dealerHand.getPipTotal() === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.DealerWins,
      roundEndCondition: RoundEndCondition.Blackjack
    };
  }

  if(dealerHand.getPipTotal() > 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.PlayerWins,
      roundEndCondition: RoundEndCondition.Busted
    };
  }

  if(dealerHand.getPipTotal() > 17)
  {
    if(dealerHand.getPipTotal() > playerHand.getPipTotal())
    {
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.DealerWins,
        roundEndCondition: RoundEndCondition.HigherScore
      };
    }
    else if(playerHand.getPipTotal() > dealerHand.getPipTotal())
    {
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.PlayerWins,
        roundEndCondition: RoundEndCondition.HigherScore
      };
    }
    else
    {
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.Tie
      };
    }
  }

  return {
    isRoundOver: false
  };

};

const handleRoundEnd = (scoreResult) => {

  if(!scoreResult.isRoundOver)
  {
    return;
  }

  console.log('Round End!');
  console.log(scoreResult);

};

const getPlayerMove = () => {

  const hitButton = domElements.hitButton;
  const standButton = domElements.standButton;

  return new Promise((resolve, reject) => {

    const onClickHitButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      resolve(PlayerMove.Hit);
    };

    const onClickStandButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      resolve(PlayerMove.Stand);
    };

    hitButton.addEventListener('click', onClickHitButton);
    standButton.addEventListener('click', onClickStandButton);

  });

};

startRound();
