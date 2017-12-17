/*
document.addEventListener('keydown', (event) => {
  if(event.keyCode === 13)
  {
    if(!isTalking)
    {
      outputNextMessage();
    }
    else if(!isSkipping)
    {
      isSkipping = true;
    }
  }
});
*/

const chipDialog = document.getElementById('dealer-dialog');
const dealerDialogManager = new DialogManager(chipDialog);

const chip = (message) => {
  return () => (dealerDialogManager.outputMessage(message));
};

sequence([
    chip("Hiya! My name's *Chip*! Let's play some Blackjack!"),
    chip("First dialog test"),
    chip("Second dialog test")
]);
