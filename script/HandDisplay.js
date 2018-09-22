export default class {

  constructor(hand, domElement) {
    this.domElement = domElement;
    this.hand = hand;
    this.listElement = this.domElement.querySelector('ul');
    this.pipTotalElement = this.domElement.querySelector('.pip-total');
    this.pipTotalElement.className = 'pip-total';
  }

  refreshHand() {

    // If applicable, remove the "hidden" class
    if(this.domElement.classList.contains('hidden'))
    {
      this.domElement.classList.remove('hidden');
    }

    // Remove all cards
    // Source: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    while (this.listElement.firstChild)
    {
      this.listElement.removeChild(this.listElement.firstChild);
    }

    // Update the cards
    let lastCardIndex = (this.hand.cards.length - 1);
    this.hand.cards.forEach((card, index) => {

      const newCardElem = document.createElement('li');
      const isFaceUp = card.isFaceUp;

      newCardElem.classList = `card ${isFaceUp ? card.suit.toLowerCase() : 'facedown'}`;

      if(index === lastCardIndex)
      {
        newCardElem.classList += ' new';
      }

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

  hideHand() {
    this.domElement.classList.add('hidden');
    this.pipTotalElement.innerHTML = '0';
  }

};
