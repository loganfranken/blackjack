import chip from './chip';
import { getRandomInt } from '../Utility';

export default async function(state)
{
  let isFirstNewStandCard = (state.dealerHand.cards.length === 2);

  // First card being dealt after revealing the hole card
  if(isFirstNewStandCard)
  {
    let key = getRandomInt(0, 1);

    switch(key)
    {
      case 0:
        await chip('Now I\'ll deal myself a card.');
        return;

      case 1:
        await chip('Now I\'ll take another card.');
        return;
    }
  }

  // All cards after dealing that first card
  let key = getRandomInt(0, 4);

  switch(key)
  {
    case 0:
      await chip('Another for me.');
      return;

    case 1:
      await chip('One more for me.');
      return;

    case 2:
      await chip('I\'ll take another.');
      return;

    case 3:
      await chip('Another card coming my way.');
      return;

    case 4:
      await chip('I\'ll keep going.');
      return;
  }
}
