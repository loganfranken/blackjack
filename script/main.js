const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand')
};

const dealerDialogManager = new DialogManager(domElements.chipDialog);

document.addEventListener('keydown', (event) => {
  if(event.keyCode === 13)
  {
    dealerDialogManager.advanceMessage();
  }
});

const deck = new Deck();

const playerHand = new Hand();
const playerHandDisplay = new HandDisplay(domElements.playerHand);

const dealerHand = new Hand();
const dealerHandDisplay = new HandDisplay(domElements.dealerHand);

const chip = (message) => {
  return () => (dealerDialogManager.outputMessage(message));
};

const dealPlayerCard = () => {
  return dealCard(deck.dealFaceUpCard(), playerHand);
};

const dealDealerFaceUpCard = () => {
  return dealCard(deck.dealFaceUpCard(), dealerHand);
};

const dealDealerFaceDownCard = () => {
  return dealCard(deck.dealFaceDownCard(), dealerHand);
};

const dealCard = (newCard, hand) => {
  hand.takeCard(newCard);
  return { card: newCard, pipTotal: hand.getPipTotal(false) };
};

const displayNewPlayerCard = (card) => {
  playerHandDisplay.addCard(card);
};

const displayNewDealerCard = (card) => {
  dealerHandDisplay.addCard(card);
};

sequence([

    chip("Hiya! My name's *Chip*! Let's play some Blackjack!"),

    chip("First, I'll deal you a card"),
    dealPlayerCard,
    displayNewPlayerCard,

    chip("Next, I'll deal myself a card"),
    dealDealerFaceUpCard,
    displayNewDealerCard,

    chip("And another for you"),
    dealPlayerCard,
    displayNewPlayerCard,

    chip("And one more for me, but this one face down! No peeking!"),
    dealDealerFaceDownCard,
    displayNewDealerCard

]);
