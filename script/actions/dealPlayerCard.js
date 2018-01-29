const dealPlayerCard = () => {
  let card = deck.dealFaceUpCard();
  playerHand.takeCard(card);
  return card;
};
