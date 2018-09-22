import chip from './chip';
import chipExplainFaceCard from './chipExplainFaceCard';
import chipExplainAceCard from './chipExplainAceCard';
import getRankDescription from './getRankDescription';

export default async function chipReactToDealerCard(newCard, isHoleCard, state)
{
  if(isHoleCard)
  {
    if(!state.hasReactedToHoleCard)
    {
      await chip(`I had ${getRankDescription(newCard.rank)}.`);
      state.hasReactedToHoleCard = true;
    }
  }
  else
  {
    if(!state.hasReactedToDealerCard)
    {
      await chip(`I got ${getRankDescription(newCard.rank)}.`);
      state.hasReactedToDealerCard = true;
    }
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
