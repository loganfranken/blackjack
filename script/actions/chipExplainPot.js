import chip from './chip';
import RoundEndState from '../RoundEndState';

export default async function(score, state)
{
  if(score.roundEndState === RoundEndState.DealerWins && !state.hasExplainedPot)
  {
    await chip(`If you lose all your coins, that's game over!`);
    state.hasExplainedPot = true;
  }
}
