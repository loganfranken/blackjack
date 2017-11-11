const Deck = require('./Deck.js');
const Hand = require('./Hand.js');
const readline = require('readline');
const RoundEndCondition = require('./RoundEndCondition.js');
const RoundEndState = require('./RoundEndState.js');

const bet = 5;

let playerPot = 100;
const deck = new Deck();
let playerHand = null;
let dealerHand = null;

const displayHand = (name, hand) => {
  let output = `${name}: `;

  hand.cards.forEach((card) => {
    output += (`[${card.isFaceUp ? card.rank : '#'}] `);
  });

  output += ` => ${hand.getPipTotal()}`;

  console.log(output);
};

const displayHands = () => {
  displayHand('Player', playerHand);
  displayHand('Dealer', dealerHand);
  console.log('');
};

const startRound = () => {

  console.log('');
  console.log('==== START ROUND ====')
  console.log(`Player Pot: ${playerPot}`);
  console.log('');

  playerHand = new Hand();
  dealerHand = new Hand();

  // Deal face-up card to the player
  playerHand.takeCard(deck.dealFaceUpCard());

  // Deal face-up card to the dealer
  dealerHand.takeCard(deck.dealFaceUpCard());

  // Deal another face-up card to the player
  playerHand.takeCard(deck.dealFaceUpCard());

  // Finally, deal a face-down card to the dealer
  dealerHand.takeCard(deck.dealFaceDownCard());

  displayHands();

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

  promptPlayer();

};

const promptPlayer = () => {

  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  prompt.question('[H]: Hit, [S]: Stand ', (answer) => {

    prompt.close();

    switch(answer)
    {
      case 'H':
        handlePlayerHit();
        break;

      case 'S':
        handlePlayerStand();
        break;

      default:
        console.log('Invalid input');
        promptPlayer();
        break;
    }
  });

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

  if(dealerHand.getPipTotal() > playerHand.getPipTotal())
  {
    handleRoundEnd(RoundEndState.DealerWins, RoundEndCondition.HigherScore);
    return;
  }

  handlePlayerStand();

};

const handleRoundEnd = (roundEndState, roundEndCondition) => {

  if(roundEndState == RoundEndState.DealerWins)
  {
    playerPot -= bet;

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
    playerPot += (bet * 2);

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
  }

  startRound();

};

startRound();
