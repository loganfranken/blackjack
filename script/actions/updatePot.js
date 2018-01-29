const updatePot = (scoreResult) => {

  if(scoreResult.roundEndState === RoundEndState.DealerWins)
  {
    playerPot -= bet;
  }

  if(scoreResult.roundEndState === RoundEndState.PlayerWins)
  {
    playerPot += bet;
  }

};
