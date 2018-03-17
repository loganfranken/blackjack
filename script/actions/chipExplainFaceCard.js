async function chipExplainFaceCard(state)
{
  if(!state.hasExplainedFaceCard)
  {
    await chip(`Face cards are worth ten points.`);
    state.hasExplainedFaceCard = true;
  }
}
