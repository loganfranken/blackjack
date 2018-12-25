import ChipEmotion from '../ChipEmotion';
import RoundEndState from '../RoundEndState';
import updateChipFace from './updateChipFace';

export default async function(score, state)
{
  if(score.roundEndState === RoundEndState.DealerWins)
  {
    updateChipFace(ChipEmotion.Happy, state);
  }
};
