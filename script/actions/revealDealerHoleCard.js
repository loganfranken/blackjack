const revealDealerHoleCard = () => {
  dealerHand.cards[1].isFaceUp = true;
  return dealerHand.cards[1];
};
