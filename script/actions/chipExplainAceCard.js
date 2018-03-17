async function chipExplainAceCard(state)
{
  if(!state.hasExplainedAceCard)
  {
    await chip(`An ace is worth 11 unless it would push your score over 21.`);
    await chip(`Then it's worth only one point.`)
    state.hasExplainedAceCard = true;
  }
}
