async function chipReactToDealerCard(newCard, isHoleCard)
{
  if(isHoleCard)
  {
    await chip(`I had ${getRankDescription(newCard.rank)}.`)
  }
  else
  {
    await chip(`I got ${getRankDescription(newCard.rank)}.`);
  }

  if(newCard.isFaceCard())
  {
    await chipExplainFaceCard();
  }

  if(newCard.isAce())
  {
    await chipExplainAceCard();
  }
}
