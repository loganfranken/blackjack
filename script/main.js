const Deck = require('./Deck.js');
const Hand = require('./Hand.js');

const deck = new Deck();

const playerHand = new Hand();
const dealerHand = new Hand();

// Deal face-up card to the player
playerHand.takeCard(deck.dealFaceUpCard());

// Deal face-up card to the dealer
dealerHand.takeCard(deck.dealFaceUpCard());

// Deal another face-up card to the player
playerHand.takeCard(deck.dealFaceUpCard());

// Finally, deal a face-down card to the dealer
dealerHand.takeCard(deck.dealFaceDownCard());

const displayHand = (hand) => {
  let output = '';

  hand.cards.forEach((card) => {
    output += (`[${card.isFaceUp ? card.rank : '#'}] `);
  });

  output += ` => ${hand.getPip()}`;

  console.log(output);
};

displayHand(playerHand);
displayHand(dealerHand);
