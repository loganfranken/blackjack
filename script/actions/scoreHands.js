const scoreHands = () => {

  if(playerHand.getPipTotal() === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.PlayerWins,
      roundEndCondition: RoundEndCondition.Blackjack
    };
  }

  if(playerHand.getPipTotal() > 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.DealerWins,
      roundEndCondition: RoundEndCondition.Busted
    };
  }

  if(dealerHand.getPipTotal() === 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.DealerWins,
      roundEndCondition: RoundEndCondition.Blackjack
    };
  }

  if(dealerHand.getPipTotal() > 21)
  {
    return {
      isRoundOver: true,
      roundEndState: RoundEndState.PlayerWins,
      roundEndCondition: RoundEndCondition.Busted
    };
  }

  if(dealerHand.getPipTotal() > 17)
  {
    if(dealerHand.getPipTotal() > playerHand.getPipTotal())
    {
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.DealerWins,
        roundEndCondition: RoundEndCondition.HigherScore
      };
    }
    else if(playerHand.getPipTotal() > dealerHand.getPipTotal())
    {
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.PlayerWins,
        roundEndCondition: RoundEndCondition.HigherScore
      };
    }
    else
    {
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.Tie
      };
    }
  }

  return {
    isRoundOver: false
  };

};
