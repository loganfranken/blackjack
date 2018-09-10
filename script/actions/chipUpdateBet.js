async function chipUpdateBet(state)
{
  if(state.roundCount > 0 && state.roundCount % 2 === 0)
  {
    state.bet *= 2;
    await chip(`Let's raise the stakes! I'll increase the bet to ${state.bet}`);
  }
}
