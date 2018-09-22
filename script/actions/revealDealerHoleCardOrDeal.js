import dealDealerFaceUpCard from './dealDealerFaceUpCard';
import revealDealerHoleCard from './revealDealerHoleCard';

export default (state) => {

  let card;

  if(!state.dealerHand.cards[1].isFaceUp)
  {
    // First, reveal the dealer's hole card
    card = revealDealerHoleCard(state);
  }
  else
  {
    // After revealing the hole card, draw a face-up card
    card = dealDealerFaceUpCard(state);
  }

  return card;

};
