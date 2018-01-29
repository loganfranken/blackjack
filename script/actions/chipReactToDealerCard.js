async function chipReactToDealerCard(newCard)
{
  await chip(`I got ${getRankDescription(newCard.rank)}.`);

  if(newCard.isFaceCard())
  {
    await chipExplainFaceCard();
  }

  if(newCard.isAce())
  {
    await chipExplainAceCard();
  }
}
