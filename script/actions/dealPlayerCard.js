const dealPlayerCard = () => {
  let card = shoe.dealFaceUpCard();
  playerHand.takeCard(card);
  return card;
};
