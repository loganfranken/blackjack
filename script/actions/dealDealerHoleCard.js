const dealDealerHoleCard = () => {
  let card = deck.dealFaceDownCard();
  dealerHand.takeCard(card);
  return card;
};
