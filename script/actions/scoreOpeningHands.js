const scoreOpeningHands = () => {

  let dealerPipTotal = dealerHand.getPipTotal(true);
  let playerPipTotal = playerHand.getPipTotal();

  // Dealer has a "natural" blackjack
  if(dealerPipTotal === 21)
  {
    // Does the player also have a blackjack?
    if(playerPipTotal === 21)
    {
      // If so, this round ends in a tie
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.Tie,
        roundEndCondition: RoundEndCondition.NaturalBlackjack
      };
    }
    else
    {
      // Otherwise, the dealer automatically wins
      return {
        isRoundOver: true,
        roundEndState: RoundEndState.DealerWins,
        roundEndCondition: RoundEndCondition.NaturalBlackjack
      };
    }
  }

  // Player has a "natural" blackjack
  if(playerPipTotal === 21)
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
