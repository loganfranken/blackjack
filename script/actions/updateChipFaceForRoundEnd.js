export default async function(score, state)
{
  if(score.roundEndState === RoundEndState.DealerWins)
  {
    updateChipEmotion(ChipEmotion.Happy, state);
  }
};
