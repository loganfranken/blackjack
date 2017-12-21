const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  hitButton: document.getElementById('action-hit'),
  standButton: document.getElementById('action-stand')
};

const dealerDialogManager = new DialogManager(domElements.chipDialog);

document.addEventListener('keydown', (event) => {
  if(event.keyCode === 13)
  {
    dealerDialogManager.advanceMessage();
  }
});

const deck = new Deck();

const playerHand = new Hand();
const playerHandDisplay = new HandDisplay(domElements.playerHand);

const dealerHand = new Hand();
const dealerHandDisplay = new HandDisplay(domElements.dealerHand);

const chip = (message) => {
  return () => (dealerDialogManager.outputMessage(message));
};

const dealPlayerCard = () => {
  return dealCard(deck.dealFaceUpCard(), playerHand);
};

const dealDealerFaceUpCard = () => {
  return dealCard(deck.dealFaceUpCard(), dealerHand);
};

const dealDealerFaceDownCard = () => {
  return dealCard(deck.dealFaceDownCard(), dealerHand);
};

const dealCard = (newCard, hand) => {
  hand.takeCard(newCard);
  return { card: newCard, pipTotal: hand.getPipTotal(false) };
};

const displayNewPlayerCard = (card) => {
  playerHandDisplay.addCard(card);
};

const displayNewDealerCard = (card) => {
  dealerHandDisplay.addCard(card);
};

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

const handlePlayerHit = () => {

  // Deal face-up card to the player
  playerHand.takeCard(deck.dealFaceUpCard());
  displayHands();

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

const handlePlayerStand = () => {

  if(!dealerHand.cards[1].isFaceUp)
  {
    // First, reveal the dealer's hole card
    dealerHand.cards[1].isFaceUp = true;
  }
  else
  {
    // After revealing the hole card, draw a face-up card
    dealerHand.takeCard(deck.dealFaceUpCard());
  }

  displayHands();

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

const handleRoundEnd = (roundEndState, roundEndCondition) => {

  if(roundEndState == RoundEndState.DealerWins)
  {
    //playerPot -= bet;

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
    //playerPot += (bet * 2);

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

  if(deck.cards.length < 15)
  {
    // If the deck has less than 15 cards, reset the deck
    deck = new Deck();
  }

  //startRound();

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

  console.log(playerMove);

  switch(playerMove)
  {
    case PlayerMove.Hit:
      console.log('Player chose to hit!');
      break;

    case PlayerMove.Stand:
      console.log('Player chose to stand!');
      break;
  }

};

sequence([

    chip("Hiya! My name's *Chip*! Let's play some Blackjack!"),

    chip("First, I'll deal you a card"),
    dealPlayerCard,
    displayNewPlayerCard,

    chip("Next, I'll deal myself a card"),
    dealDealerFaceUpCard,
    displayNewDealerCard,

    chip("And another for you"),
    dealPlayerCard,
    displayNewPlayerCard,

    chip("And one more for me, but this one face down! No peeking!"),
    dealDealerFaceDownCard,
    displayNewDealerCard,

    scoreOpeningHand,

    chip("Do you want to hit or stand?"),
    getPlayerMove,

    handlePlayerMove

]);
