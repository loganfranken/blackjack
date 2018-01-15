// ==================
// DOM ELEMENTS
// ==================

const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  hitButton: document.getElementById('action-hit'),
  standButton: document.getElementById('action-stand'),
  scoreDisplay: document.getElementById('player-pot'),
  playerControls: document.getElementById('player-controls')
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

let roundCount = 0;

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

    await chipRoundStart(roundCount);

    // First Card: Player, face-up
    await chipRoundFirstCard(roundCount);
    dealPlayerCard();
    refreshPlayerHandDisplay();

    // Second Card: Dealer, face-up
    await chipRoundSecondCard(roundCount);
    dealDealerFaceUpCard();
    refreshDealerHandDisplay();

    // Third Card: Player, face-up
    await chipRoundThirdCard(roundCount);
    dealPlayerCard();
    refreshPlayerHandDisplay();

    // Fourth Card: Dealer, face-down
    await chipRoundFourthCard(roundCount);
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
        roundCount++;
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
      hidePlayerControls();
      resolve(PlayerMove.Hit);
    };

    const onClickStandButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      hidePlayerControls();
      resolve(PlayerMove.Stand);
    };

    hitButton.addEventListener('click', onClickHitButton);
    standButton.addEventListener('click', onClickStandButton);

    // Display the controls
    showPlayerControls();

  });

};

async function chipRoundStart(roundCount)
{
  if(roundCount === 0)
  {
    await chip("Hiya! My name's *Chip*! Let's play some *Blackjack*! (Press *Enter*)");
  }
  else
  {
    await chip("Next round!");
  }
}

async function chipRoundFirstCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("First, I'll deal you a card.");
  }
  else
  {
    await chip("Here's your card.");
  }
}

async function chipRoundSecondCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("Next, I'll deal myself a card.");
  }
  else
  {
    await chip("And here's my card.");
  }
}

async function chipRoundThirdCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("And another for you!");
  }
  else
  {
    await chip("And another for you.");
  }
}

async function chipRoundFourthCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("And one more for me, but this one face down! *No peeking!*");
  }
  else
  {
    await chip("And another for me.")
  }
}

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

const showPlayerControls = () => {
  domElements.playerControls.className = 'active';
};

const hidePlayerControls = () => {
  domElements.playerControls.className = '';
};

startRound();
