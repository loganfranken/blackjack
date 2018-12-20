import ChipEmotion from '../ChipEmotion';
import updateChipFace from './updateChipFace';

export default async function(state)
{
  updateChipFace(ChipEmotion.Default, state);
};
