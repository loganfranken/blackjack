import RoundEndState from '../RoundEndState';

export default (scoreResult, state) => {

  state.previousPlayerPot = (state.playerPot);

  if(scoreResult.roundEndState === RoundEndState.DealerWins)
  {
    state.playerPot -= state.bet;
  }

  if(scoreResult.roundEndState === RoundEndState.PlayerWins)
  {
    state.playerPot += state.bet;
  }

};
