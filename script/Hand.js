export default class {

  constructor() {
    this.cards = [];
  }

  takeCard(card) {
    this.cards.push(card);
  }

  getPipTotal(includeFaceDown) {
    let pip = 0;
    let aceCount = 0;

    // Total up the base pip values
    this.cards.forEach((card) => {

      if(!includeFaceDown && !card.isFaceUp)
      {
        return;
      }

      switch(card.rank)
      {
        case 'A':
          aceCount++;
          break;

        case '2':
          pip += 2;
          break;

        case '3':
          pip += 3;
          break;

        case '4':
          pip += 4;
          break;

        case '5':
          pip += 5;
          break;

        case '6':
          pip += 6;
          break;

        case '7':
          pip += 7;
          break;

        case '8':
          pip += 8;
          break;

        case '9':
          pip += 9;
          break;

        case '10':
        case 'J':
        case 'Q':
        case 'K':
          pip += 10;
          break;
      }

    });

    // Add in the ace values
    if(aceCount > 0)
    {
      // Start by assuming all of the aces in the hand can be equal to
      // 11 and then work backwards from that assumption until the total pip
      // value is under 21 or you are just treating aces as ones
      let aceTotal = aceCount * 11;

      while((pip + aceTotal) > 21 && aceTotal != aceCount)
      {
        aceTotal -= 10;
      }

      pip += aceTotal;
    }

    return pip;
  }

};
