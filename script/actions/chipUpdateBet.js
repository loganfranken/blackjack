import chip from './chip';

export default async function chipUpdateBet(state)
{
  if(state.dialogLevel > 5 && state.bet < 100)
  {
    state.bet += 10;
    await chip(`Let's raise the stakes! I'll increase the bet to *${state.bet}*.`);
  }
}
