import chip from './chip';

export default async function chipRoundSecondCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("Next, I'll deal myself a card.");
  }
  else
  {
    await chip("And here's my card.");
  }
}
