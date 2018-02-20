async function chipRoundEnd(score)
{
  let message = '';

  switch(score.roundEndState)
  {
    // Dealer Wins
    case RoundEndState.DealerWins:
        switch(score.roundEndCondition)
        {
          case RoundEndCondition
        }
      break;

    // Player Wins
    case RoundEndState.PlayerWins:
      break;

    // Tie
    case RoundEndCondition.Tie:
      break;
  }

  /*
  let message = '';

  switch(score.roundEndState)
  {
    case RoundEndState.DealerWins:
      message += '*Dealer Wins!* ';
      break;

    case RoundEndState.PlayerWins:
      message += '*Player Wins!* ';
      break;

    case RoundEndState.Tie:
      message += '*Tie!* ';
      break;
  }

  switch(score.roundEndCondition)
  {
    case RoundEndCondition.NaturalBlackjack:
      message += 'Natural Blackjack!';
      break;

    case RoundEndCondition.Blackjack:
      message += 'Blackjack!';
      break;

    case RoundEndCondition.Busted:
      message += 'Busted!';
      break;

    case RoundEndCondition.HigherScore:
      message += 'Higher Score!';
      break;
  }
  */

  await dealerDialogManager.outputMessage(message);
};
