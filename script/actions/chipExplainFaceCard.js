import chip from './chip';

export default async function chipExplainFaceCard(state)
{
  if(!state.hasExplainedFaceCard)
  {
    await chip(`Raise your trumpets! Here comes royalty!`);
    await chip(`...`);
    await chip(`The first face card, I mean.`);
    await chip(`Anyway...`);
    await chip(`Face cards are worth ten points.`);
    state.hasExplainedFaceCard = true;
  }
}
