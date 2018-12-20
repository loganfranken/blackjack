import chip from './chip';

export default async function chipRoundFourthCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("And one more for me, but this one face down!");
    await chip("I get to take a little peek, but not you.");
    await chip("If I'm real lucky and start off with a blackjack, then that's a win for me!");
  }
  else
  {
    await chip("And another for me.")
  }
}
