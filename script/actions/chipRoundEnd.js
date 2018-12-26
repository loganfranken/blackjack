import chip from './chip';
import ChipEmotion from '../ChipEmotion';
import RoundEndCondition from '../RoundEndCondition';
import RoundEndState from '../RoundEndState';
import showBet from './showBet';
import updateChipFace from './updateChipFace';

export default async function(score, state)
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
            updateChipFace(ChipEmotion.Happy, state);
            await chip(`*Hot dog!* I started off with a blackjack!`);
            updateChipFace(ChipEmotion.Awkward, state);
            await chip(`...`);
            await chip(`Oof, sorry to gloat!`);
            await chip(`Well, I guess I got lucky: that's a win for me.`);
            break;

          case RoundEndCondition.Blackjack:
            await chip(`Oh, 21 for me! That's blackjack!`);
            await chip(`Looks like I win this round.`);
            break;

          case RoundEndCondition.Busted:
            updateChipFace(ChipEmotion.Bummed, state);
            await chip(`Oh no! You went over 21 and busted!`);
            updateChipFace(ChipEmotion.Default, state);
            await chip(`Better luck next round!`);
            break;

          case RoundEndCondition.HigherScore:
            await chip(`Phew! I made it over 17 with the highest score.`);
            await chip(`That's a win for me.`);
            break;
        }
      break;

    // Player Wins
    case RoundEndState.PlayerWins:
      switch(score.roundEndCondition)
      {
        case RoundEndCondition.NaturalBlackjack:
          updateChipFace(ChipEmotion.Astonished, state);
          await chip('*What!*');
          await chip('You started off with a blackjack!');
          updateChipFace(ChipEmotion.Happy, state);
          await chip('*Lucky!*');
          await chip('You win that round!');
          break;

        case RoundEndCondition.Blackjack:
          updateChipFace(ChipEmotion.Happy, state);
          await chip('Look at you, you made it to 21!');
          await chip(`That's blackjack! You win!`);
          updateChipFace(ChipEmotion.Default, state);
          break;

        case RoundEndCondition.Busted:
          await chip(`Ahh, I went over 21 and busted! Dang!`);
          updateChipFace(ChipEmotion.Happy, state);
          await chip(`Well, that's a win for you!`);
          break;

        case RoundEndCondition.HigherScore:
          updateChipFace(ChipEmotion.Happy, state);
          await chip(`You have the higher score! *You win!*`);
          break;
      }
      break;

    // Tie
    case RoundEndState.Tie:


      switch(score.roundEndCondition)
      {
        case RoundEndCondition.NaturalBlackjack:
          updateChipFace(ChipEmotion.Astonished, state);
          await chip(`Whoa!`);
          await chip(`Whoa-oooah!`);
          await chip(`We both have blackjacks!`);
          await chip(`That's a *magical* tie!`);
          break;

        default:
          updateChipFace(ChipEmotion.Astonished, state);
          await chip(`Oh, whoa! It's a tie!`);
      }
      break;
  }

  // Explain pot
  let potExplanation = '';

  if(state.roundCount === 0)
  {
    switch(score.roundEndState)
    {
      case RoundEndState.DealerWins:
        potExplanation = `Since I win, you lose the current bet, which is *${state.bet} coins*.`;
        break;

      case RoundEndState.PlayerWins:
        potExplanation = `Since you win, you get the current bet, which is *${state.bet} coins*.`;
        break;

      case RoundEndState.Tie:
        potExplanation = `Since we tied, no one wins the bet, which is *${state.bet} coins*.`;
        break;
    }

    showBet(state);
    await chip(potExplanation);
  }
};
