const DialogManager = require('./DialogManager.js');

const chipDialog = document.getElementById('chip-dialog');

const dealerDialog = [
  "Hiya! My name's *Chip*! Let's play some Blackjack!"
];

const dealerDialogManager = new DialogManager(dealerDialog);

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