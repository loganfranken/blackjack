const dealDealerHoleCard = () => {
  let card = shoe.dealFaceDownCard();
  dealerHand.takeCard(card);
  return card;
};
