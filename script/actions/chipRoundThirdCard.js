async function chipRoundThirdCard(roundCount)
{
  if(roundCount === 0)
  {
    await chip("And now I'll deal you another card.");
  }
  else
  {
    await chip("And another for you.");
  }
}
