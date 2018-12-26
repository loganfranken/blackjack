import chip from './chip';
import ChipEmotion from '../ChipEmotion';
import updateChipFace from './updateChipFace';

export default async function chipExplainAceCard(state)
{
  if(!state.hasExplainedAceCard)
  {
    updateChipFace(ChipEmotion.Happy, state);
    await chip(`Ooh, spicy: an ace!`);
    updateChipFace(ChipEmotion.Default, state);
    await chip(`The ace is tricky: it's worth 11 unless it would push your score over 21.`);
    await chip(`Then it's only worth one point.`);
    state.hasExplainedAceCard = true;
  }
}
