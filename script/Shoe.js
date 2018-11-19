import Deck from './Deck';
import { getRandomInt, shuffle } from './Utility';

export default class {

  constructor(deckCount)
  {
    this.deckCount = deckCount;
    this.reset();
  }

  dealFaceUpCard()
  {
    const card = this.cards.shift();
    card.isFaceUp = true;
    return card;
  }

  dealFaceDownCard()
  {
    const card = this.cards.shift();
    card.isFaceUp = false;
    return card;
  }

  needsReset()
  {
    return this.cards.length < this.splitCount;
  }

  reset()
  {
    this.cards = [];

    for(let i=0; i<this.deckCount; i++)
    {
      let deck = new Deck();
      this.cards.push(...deck.cards);
    }

    shuffle(this.cards);

    this.splitCount = getRandomInt(20, this.cards.length - 1);
  }

};
