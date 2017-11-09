const suits = [
  'Clubs',
  'Diamonds',
  'Hearts',
  'Spades'
];

const ranks = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King'
];

function Card(suit, rank)
{
  this.suit = suit;
  this.rank = rank;
}

let cards = [];

suits.forEach((suit) => {
  ranks.forEach((rank) => {
    cards.push(new Card(suit, rank));
  });
});

console.log(cards.length);
