import chip from './chip';
import chipExplainAceCard from './chipExplainAceCard';
import chipExplainFaceCard from './chipExplainFaceCard';
import getRankDescription from './getRankDescription';

export default async function chipReactToPlayerCard(newCard, state)
{
  if(!state.hasReactedToPlayerCard)
  {
    await chip(`You got ${getRankDescription(newCard.rank)}.`);
    state.hasReactedToPlayerCard = true;
  }

  if(newCard.isFaceCard())
  {
    await chipExplainFaceCard(state);
  }

  if(newCard.isAce())
  {
    await chipExplainAceCard(state);
  }
}
