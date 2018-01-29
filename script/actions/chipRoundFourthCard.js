async function chipRoundFourthCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("And one more for me, but this one face down! *No peeking!*");
  }
  else
  {
    await chip("And another for me.")
  }
}
