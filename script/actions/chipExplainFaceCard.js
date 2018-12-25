import chip from './chip';
import ChipEmotion from '../ChipEmotion';
import updateChipFace from './updateChipFace';

export default async function chipExplainFaceCard(state)
{
  if(!state.hasExplainedFaceCard)
  {
    updateChipFace(ChipEmotion.Astonished, state);
    await chip(`Raise your trumpets! Here comes royalty!`);
    updateChipFace(ChipEmotion.Awkward, state);
    await chip(`...`);
    await chip(`The first face card, I mean.`);
    await chip(`Anyway...`);
    updateChipFace(ChipEmotion.Default, state);
    await chip(`Face cards are worth ten points.`);
    state.hasExplainedFaceCard = true;
  }
}
