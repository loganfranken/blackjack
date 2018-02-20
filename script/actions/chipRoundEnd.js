async function chipRoundEnd(score, roundCount)
{
  let message = '';

  // Explain end state
  switch(score.roundEndState)
  {
    // Dealer Wins
    case RoundEndState.DealerWins:
        switch(score.roundEndCondition)
        {
          case RoundEndCondition.NaturalBlackjack:
            message = '*Hot dog!* I started off with a blackjack. *I win!*';
            break;

          case RoundEndCondition.Blackjack:
            message = "I got 21. That's blackjack! *I win!*";
            break;

          case RoundEndCondition.Busted:
            message = "You went over 21 and busted. *I win!*";
            break;

          case RoundEndCondition.HigherScore:
            message = "Phew! I made it over 17 with the highest score. *I win!*";
            break;
        }
      break;

    // Player Wins
    case RoundEndState.PlayerWins:
      switch(score.roundEndCondition)
      {
        case RoundEndCondition.NaturalBlackjack:
          message = "*Lucky!* You started off with a blackjack. *You win!*";
          break;

        case RoundEndCondition.Blackjack:
          message = "You got 21. That's blackjack! *You win!*";
          break;

        case RoundEndCondition.Busted:
          message = "Ahh, I went over 21 and busted. *You win!*";
          break;

        case RoundEndCondition.HigherScore:
          message = "You have the higher score! *You win!*";
          break;
      }
      break;

    // Tie
    case RoundEndState.Tie:
      message = "It's a *tie!*";

      switch(score.roundEndCondition)
      {
        case RoundEndCondition.NaturalBlackjack:
          message = "We both have natural blackjacks! *It's a tie!*";
          break;
      }
      break;
  }

  await dealerDialogManager.outputMessage(message);

  // Explain pot
  let potExplanation = '';

  if(roundCount === 0)
  {
    switch(score.roundEndState)
    {
      case RoundEndState.DealerWins:
        potExplanation = `Since I win, you lose 10 coins.`;
        break;

      case RoundEndState.PlayerWins:
        potExplanation = `Since you win, you get 10 coins.`;
        break;

      case RoundEndState.Tie:
        potExplanation = `Since we tied, on one gets any coins`;
        break;
    }

    await dealerDialogManager.outputMessage(potExplanation);
  }
};
