import chip from './chip';

export default async function chipExplainAceCard(state)
{
  if(!state.hasExplainedAceCard)
  {
    await chip(`Ooh, spicy: an ace!`);
    await chip(`The ace is tricky: it's worth 11 unless it would push your score over 21.`);
    await chip(`Then it's only worth one point.`);
    state.hasExplainedAceCard = true;
  }
}
