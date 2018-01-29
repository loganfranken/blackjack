async function chipExplainFaceCard()
{
  if(!hasExplainedFaceCard)
  {
    await chip(`Face cards are worth ten points.`);
    hasExplainedFaceCard = true;
  }
}
