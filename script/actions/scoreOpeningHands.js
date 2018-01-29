const scoreOpeningHands = () => {

  if(dealerHand.getPipTotal(true) === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.DealerWins,
      roundEndCondition: RoundEndCondition.NaturalBlackjack
    };
  }

  if(playerHand.getPipTotal() === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.PlayerWins,
      roundEndCondition: RoundEndCondition.NaturalBlackjack
    };
  }

  return {
    isRoundOver: false
  };

};
