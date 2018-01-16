const HandDisplay = class {

  constructor(hand, domElement) {
    this.domElement = domElement;
    this.hand = hand;
    this.listElement = this.domElement.querySelector('ul');
    this.pipTotalElement = this.domElement.querySelector('.pip-total');
    this.pipTotalElement.className = 'pip-total';
  }

  refreshHand() {

    // Remove all cards
    // Source: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    while (this.listElement.firstChild)
    {
      this.listElement.removeChild(this.listElement.firstChild);
    }

    // Update the cards
    this.hand.cards.forEach((card) => {

      const newCardElem = document.createElement('li');
      const isFaceUp = card.isFaceUp;

      newCardElem.setAttribute('class', `card ${isFaceUp ? card.suit.toLowerCase() : 'facedown'}`);

      if(isFaceUp)
      {
        newCardElem.setAttribute('data-rank', card.rank);
      }

      this.listElement.appendChild(newCardElem);

    });

    // Update the score
    const pipTotal = this.hand.getPipTotal();
    this.pipTotalElement.innerHTML = pipTotal;

    // If applicable, display the score
    if(pipTotal > 0 && this.pipTotalElement.className === 'pip-total')
    {
      this.pipTotalElement.className += ' active';
    }
  }

};
