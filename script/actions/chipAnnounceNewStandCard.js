import chip from './chip';
import { getRandomInt } from '../Utility';

export default async function()
{
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
