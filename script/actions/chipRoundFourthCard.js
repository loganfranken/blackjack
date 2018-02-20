async function chipRoundFourthCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("And one more for me, but this one face down!");
    await chip("I get to take a peek, but not you.");
    await chip("I mean it! *No peeking!*");
  }
  else
  {
    await chip("And another for me.")
  }
}
