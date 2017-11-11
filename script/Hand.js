module.exports = class {

  constructor() {
    this.cards = [];
  }

  takeCard(card) {
    this.cards.push(card);
  }

  getPip() {
    let pip = 0;
    let aceCount = 0;

    // Total up the base pip values
    this.cards.forEach((card) => {

      if(!card.isFaceUp)
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
    if(aceCount > 1)
    {
      // If the player has more than one ace, they are both worth 1
      pip += aceCount;
    }
    else if(aceCount == 1)
    {
      // Otherwise, the ace is worth 11 unless this would cause the player
      // to exceed 21
      pip += (pip + 11 > 21) ? 1 : 11;
    }

    return pip;
  }

};
