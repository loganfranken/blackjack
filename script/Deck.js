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

  dealFaceUpCard()
  {
    const card = this.cards.pop();
    card.isFaceUp = true;
    return card;
  }

  dealFaceDownCard()
  {
    const card = this.cards.pop();
    card.isFaceUp = false;
    return card;
  }

};
