const dealDealerFaceUpCard = () => {
  let card = deck.dealFaceUpCard();
  dealerHand.takeCard(card);
  return card;
};
