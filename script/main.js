// ==================
// DOM ELEMENTS
// ==================

const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  hitButton: document.getElementById('action-hit'),
  standButton: document.getElementById('action-stand'),
  scoreDisplay: document.getElementById('player-pot')
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

let playerPot = 100;
let bet = 10;

// ==================
// MAIN GAME LOGIC
// ==================

async function startRound()
{
  updatePotDisplay();

  // Loop: Round
  while(true)
  {
    playerHand = new Hand();
    playerHandDisplay = new HandDisplay(playerHand, domElements.playerHand);
    playerHandDisplay.refreshHand();

    dealerHand = new Hand();
    dealerHandDisplay = new HandDisplay(dealerHand, domElements.dealerHand);
    dealerHandDisplay.refreshHand();

    await chip("Hiya! My name's *Chip*! Let's play some *Blackjack*!");

    await chip("First, I'll deal you a card.");
    dealPlayerCard();
    refreshPlayerHandDisplay();

    await chip("Next, I'll deal myself a card.");
    dealDealerFaceUpCard();
    refreshDealerHandDisplay();

    await chip("And another for you!");
    dealPlayerCard();
    refreshPlayerHandDisplay();

    await chip("And one more for me, but this one face down! *No peeking!*");
    dealDealerHoleCard();
    refreshDealerHandDisplay();

    let score = scoreOpeningHands();
    if(score.isRoundOver)
    {
      updatePot(score);
      updatePotDisplay();
      await chipRoundEnd(score);
      continue;
    }

    // Loop: Player Choice
    while(true)
    {
      await chip("Do you want to hit or stand?", true);
      let playerMove = await getPlayerMove();

      if(playerMove === PlayerMove.Hit)
      {
        await chip("Alright, here's your card.");
        dealPlayerCard();
        refreshPlayerHandDisplay();
      }

      if(playerMove === PlayerMove.Stand)
      {
        // Loop: Stand
        while(true)
        {
          await chip("Alright, another card for me.");
          revealDealerHoleCardOrDeal();
          refreshDealerHandDisplay();

          if(scoreHands().isRoundOver)
          {
            break;
          }
        }
      }

      let score = scoreHands();
      if(score.isRoundOver)
      {
        updatePot(score);
        updatePotDisplay();
        await chipRoundEnd(score);
        break;
      }
    }
  }
};

// ==================
// SHORTCUT FUNCTIONS
// ==================

async function chip(message, skipConfirm)
{
  await dealerDialogManager.outputMessage(message, skipConfirm);
}

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

async function chipRoundEnd(score)
{
  let message = '';

  switch(score.roundEndState)
  {
    case RoundEndState.DealerWins:
      message += '*Dealer Wins!* ';
      break;

    case RoundEndState.PlayerWins:
      message += '*Player Wins!* ';
      break;

    case RoundEndState.Tie:
      message += '*Tie!* ';
      break;
  }

  switch(score.roundEndCondition)
  {
    case RoundEndCondition.NaturalBlackjack:
      message += 'Natural Blackjack!';
      break;

    case RoundEndCondition.Blackjack:
      message += 'Blackjack!';
      break;

    case RoundEndCondition.Busted:
      message += 'Busted!';
      break;

    case RoundEndCondition.HigherScore:
      message += 'Higher Score!';
      break;
  }

  await dealerDialogManager.outputMessage(message);
};

const updatePot = (scoreResult) => {

  if(scoreResult.roundEndState === RoundEndState.DealerWins)
  {
    playerPot -= bet;
  }

  if(scoreResult.roundEndState === RoundEndState.PlayerWins)
  {
    playerPot += bet;
  }

};

const updatePotDisplay = () => {
  domElements.scoreDisplay.innerHTML = playerPot;
};

startRound();
