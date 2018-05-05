const Deck = class {

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
