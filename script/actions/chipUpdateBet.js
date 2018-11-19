import chip from './chip';

export default async function chipUpdateBet(state)
{
  if(state.dialogLevel > 7 && state.roundCount % 3 === 0)
  {
    state.bet *= 2;
    await chip(`Let's raise the stakes! I'll increase the bet to *${state.bet}*.`);
  }
}
