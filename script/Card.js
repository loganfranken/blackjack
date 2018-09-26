export default class {

  constructor(suit, rank, isFaceUp)
  {
    this.suit = suit;
    this.rank = rank;
    this.isFaceUp = isFaceUp;
  }

  isFaceCard()
  {
    return (this.rank === 'J' || this.rank === 'Q' || this.rank === 'K');
  }

  isAce()
  {
    return (this.rank === 'A');
  }

  isNumber()
  {
    return !this.isAce() && !this.isFaceCard();
  }

};
