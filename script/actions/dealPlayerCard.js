export default (state) => {
  let card = state.shoe.dealFaceUpCard();
  state.playerHand.takeCard(card);
  return card;
};
