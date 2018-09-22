import Card from './Card';
import Ranks from './Ranks';
import { shuffle } from './Utility';
import Suits from './Suits';

export default class {

  constructor()
  {
    this.cards = [];

    Suits.forEach((suit) => {
      Ranks.forEach((rank) => {
        this.cards.push(new Card(suit, rank, false));
      });
    });

    shuffle(this.cards);
  }

};
