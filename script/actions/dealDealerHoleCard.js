export default (state) => {
  let card = state.shoe.dealFaceDownCard();
  state.dealerHand.takeCard(card);
  return card;
};
