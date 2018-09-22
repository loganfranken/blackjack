import chip from './chip';

export default async function chipRoundFirstCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("First, I'll deal you a card.");
  }
  else
  {
    await chip("Here's your card.");
  }
}
