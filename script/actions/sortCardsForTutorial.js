export default function(cards)
{
  let oldCards = cards.slice();
  let newCards = [];

  // First eight cards should be regular cards
  newCards.push(...pullCards(oldCards, 8, (card) => card.isNumber()))

  // Next card should be a face card
  newCards.push(...pullCards(oldCards, 1, (card) => card.isFaceCard()))

  // Next cards should be regular cards to buffer between the face card and ace
  newCards.push(...pullCards(oldCards, 4, (card) => card.isNumber()))

  // Next card should be an ace
  newCards.push(...pullCards(oldCards, 1, (card) => card.isAce()))

  // Put all of the remaining cards in the deck
  for(var i=0; i<oldCards.length; i++)
  {
    let card = oldCards[i];

    if(card != null)
    {
      newCards.push(oldCards[i]);
    }
  }

  return newCards;
}

function pullCards(cards, count, filter)
{
  let pulledCards = [];
  let index = 0;

  while(pulledCards.length < count)
  {
    let card = cards[index];
    if(card != null && filter(card))
    {
      pulledCards.push(card);
      cards[index] = null;
    }
    index++;
  }

  return pulledCards;
}
