const dealDealerFaceUpCard = () => {
  let card = shoe.dealFaceUpCard();
  dealerHand.takeCard(card);
  return card;
};
