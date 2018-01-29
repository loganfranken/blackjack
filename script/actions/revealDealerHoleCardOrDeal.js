const revealDealerHoleCardOrDeal = () => {

  let card;

  if(!dealerHand.cards[1].isFaceUp)
  {
    // First, reveal the dealer's hole card
    card = revealDealerHoleCard();
  }
  else
  {
    // After revealing the hole card, draw a face-up card
    card = dealDealerFaceUpCard();
  }

  return card;

};
