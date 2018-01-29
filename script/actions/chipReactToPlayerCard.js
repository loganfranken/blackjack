async function chipReactToPlayerCard(newCard, score, roundCount)
{
  await chip(`You got ${getRankDescription(newCard.rank)}.`);

  if(newCard.isFaceCard())
  {
    await chipExplainFaceCard();
  }

  if(newCard.isAce())
  {
    await chipExplainAceCard();
  }
}
