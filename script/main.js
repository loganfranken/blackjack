const chipDialog = document.getElementById('dealer-dialog');
const dealerDialogManager = new DialogManager(chipDialog);

document.addEventListener('keydown', (event) => {
  if(event.keyCode === 13)
  {
    dealerDialogManager.advanceMessage();
  }
});

const chip = (message) => {
  return () => (dealerDialogManager.outputMessage(message));
};

sequence([
    chip("Hiya! My name's *Chip*! Let's play some Blackjack!"),
    chip("First dialog test"),
    chip("Second dialog test")
]);
