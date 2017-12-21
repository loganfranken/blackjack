const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  hitButton: document.getElementById('action-hit'),
  standButton: document.getElementById('action-stand')
};

const dealerDialogManager = new DialogManager(domElements.chipDialog);

let deck = new Deck();

let playerHand = null;
let playerHandDisplay = null;

let dealerHand = null;
let dealerHandDisplay = null;

const scoreOpeningHand = () => {

  if(dealerHand.getPipTotal(true) === 21)
  {
    handleRoundEnd(RoundEndState.DealerWins, RoundEndCondition.NaturalBlackjack);
    return;
  }

  if(playerHand.getPipTotal() === 21)
  {
    handleRoundEnd(RoundEndState.PlayerWins, RoundEndCondition.NaturalBlackjack);
    return;
  }

};

const handleRoundEnd = (roundEndState, roundEndCondition) => {

  if(roundEndState == RoundEndState.DealerWins)
  {
    if(roundEndCondition === RoundEndCondition.NaturalBlackjack)
    {
      console.log('Dealer started with a natural blackjack. Dealer wins!');
    }
    else if(roundEndCondition === RoundEndCondition.Blackjack)
    {
      console.log('Dealer got a blackjack. Dealer wins!');
    }
    else if(roundEndCondition === RoundEndCondition.Busted)
    {
      console.log('Player busted. Dealer wins!');
    }
    else if(roundEndCondition === RoundEndCondition.HigherScore)
    {
      console.log('Dealer has higher score than player. Dealer wins!');
    }
  }
  else if(roundEndState === RoundEndState.PlayerWins)
  {
    if(roundEndCondition === RoundEndCondition.NaturalBlackjack)
    {
      console.log('Player started with a natural blackjack. Player wins!');
    }
    else if(roundEndCondition === RoundEndCondition.Blackjack)
    {
      console.log('Player got a blackjack. Player wins!');
    }
    else if(roundEndCondition === RoundEndCondition.Busted)
    {
      console.log('Dealer busted. Player wins!');
    }
    else if(roundEndCondition === RoundEndCondition.HigherScore)
    {
      console.log('Player has higher score than dealer. Player wins!');
    }
  }
  else if(roundEndState === RoundEndState.Tie)
  {
    console.log('Tie!');
  }

  startRound();

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

const handlePlayerMove = (playerMove) => {

  switch(playerMove)
  {
    case PlayerMove.Hit:
      handlePlayerHit();
      break;

    case PlayerMove.Stand:
      handlePlayerStand();
      break;
  }

};

const handlePlayerStand = () => {

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

  refreshDealerHandDisplay();

  if(dealerHand.getPipTotal() === 21)
  {
    handleRoundEnd(RoundEndState.DealerWins, RoundEndCondition.Blackjack);
    return;
  }

  if(dealerHand.getPipTotal() > 21)
  {
    handleRoundEnd(RoundEndState.PlayerWins, RoundEndCondition.Busted);
    return;
  }

  if(dealerHand.getPipTotal() > 17)
  {
    if(dealerHand.getPipTotal() > playerHand.getPipTotal())
    {
      handleRoundEnd(RoundEndState.DealerWins, RoundEndCondition.HigherScore);
    }
    else if(playerHand.getPipTotal() > dealerHand.getPipTotal())
    {
      handleRoundEnd(RoundEndState.PlayerWins, RoundEndCondition.HigherScore);
    }
    else
    {
      handleRoundEnd(RoundEndState.Tie);
    }

    return;
  }

  handlePlayerStand();

};

const handlePlayerHit = () => {

  // Deal face-up card to the player
  playerHand.takeCard(deck.dealFaceUpCard());
  playerHandDisplay.refreshHand();

  if(playerHand.getPipTotal() === 21)
  {
    handleRoundEnd(RoundEndState.PlayerWins, RoundEndCondition.Blackjack);
    return;
  }

  if(playerHand.getPipTotal() > 21)
  {
    handleRoundEnd(RoundEndState.DealerWins, RoundEndCondition.Busted);
    return;
  }

  promptPlayer();

};

const startRound = () => {

  playerHand = new Hand();
  playerHandDisplay = new HandDisplay(playerHand, domElements.playerHand);
  playerHandDisplay.refreshHand();

  dealerHand = new Hand();
  dealerHandDisplay = new HandDisplay(dealerHand, domElements.dealerHand);
  dealerHandDisplay.refreshHand();

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

      scoreOpeningHand,

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

const revealDealerHoleCard = () => {
  dealerHand.cards[1].isFaceUp = true;
};

const refreshPlayerHandDisplay = () => {
  playerHandDisplay.refreshHand();
};

const refreshDealerHandDisplay = () => {
  dealerHandDisplay.refreshHand();
};

startRound();
