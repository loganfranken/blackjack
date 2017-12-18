const HandDisplay = class {

  constructor(domElement) {
    this.domElement = domElement;
  }

  addCard(card) {
    const newCardElem = document.createElement('li');
    newCardElem.setAttribute('class', `card ${card.suit.toLowerCase()}`);
    newCardElem.setAttribute('data-rank', card.rank);

    this.domElement.appendChild(newCardElem);
  }

};
