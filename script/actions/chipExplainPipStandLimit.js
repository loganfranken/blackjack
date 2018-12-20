import chip from './chip';

export default async function chipExplainPipStandLimit(state)
{
  if(!state.hasExplainedPipStandLimit && state.dealerHand.getPipTotal() > 17)
  {
    await chip(`Alright, my card total is past 17 so I'll stop dealing myself cards.`);
    state.hasExplainedPipStandLimit = true;
  }
}
