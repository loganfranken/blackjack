const Card = require('./Card.js');
const Ranks = require('./Ranks.js');
const Suits = require('./Suits.js');
const shuffle = require('./Utility.js').shuffle;

module.exports = class {

  constructor()
  {
    this.cards = [];

    Suits.forEach((suit) => {
      Ranks.forEach((rank) => {
        this.cards.push(new Card(suit, rank));
      });
    });

    shuffle(this.cards);
  }

};
