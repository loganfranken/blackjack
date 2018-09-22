export default (state) => {
  let card = state.shoe.dealFaceUpCard();
  state.dealerHand.takeCard(card);
  return card;
};
