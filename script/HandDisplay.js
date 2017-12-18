const HandDisplay = class {

  constructor(domElement) {
    this.domElement = domElement;
    this.listElement = this.domElement.querySelector('ul');
    this.scoreElment = this.domElement.querySelector('.score');
  }

  addCard(args) {

    const card = args.card;
    const pipTotal = args.pipTotal;

    // Add the card
    const newCardElem = document.createElement('li');
    const isFaceUp = card.isFaceUp;

    newCardElem.setAttribute('class', `card ${isFaceUp ? card.suit.toLowerCase() : 'facedown'}`);

    if(isFaceUp)
    {
      newCardElem.setAttribute('data-rank', card.rank);
    }

    this.listElement.appendChild(newCardElem);

    // Update the score
    this.scoreElment.innerHTML = pipTotal;

  }

};
