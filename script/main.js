const messages = [
  "Hiya! My name's *Chip*! Let's play some *Blackjack*!",
  "This is the second line of dialogue!",
  "This is the third line of dialogue!"
];

const dealerMessage = document.getElementById('dealer-message');

let isTalking = false;
let isSkipping = false;
let currMessageIndex = 0;

const outputMessage = (message) => {
  return new Promise((resolve, reject) => {

    let currIndex = 0;
    const length = message.length;

    const outputNextCharacter = () => {

        if(isSkipping)
        {
          dealerMessage.innerHTML = convertMessageToHtml(message);
          isSkipping = false;
          resolve();
          return;
        }

        const character = message[currIndex];
        dealerMessage.innerHTML = (convertMessageToHtml(message.slice(0, currIndex + 1)));
        currIndex++;

        let timeout = 50;
        if(character === '.' || character === '?' || character === '!')
        {
          timeout = 200;
        }

        if(currIndex < length)
        {
          setTimeout(outputNextCharacter, timeout);
        }
        else
        {
          resolve();
        }

    };

    outputNextCharacter();

  });
};

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

const outputNextMessage = () => {

  if(currMessageIndex >= messages.length)
  {
    return;
  }

  dealerMessage.innerHTML = '';

  isTalking = true;
  outputMessage(messages[currMessageIndex++]).then(() => {
    isTalking = false;
  });

};

convertMessageToHtml = (message) => {

  let isStrong = false;

  let outputHtml = '';
  for(let i=0; i<message.length; i++)
  {
    const currLetter = message[i];

    if(currLetter === '*')
    {
      outputHtml += (!isStrong) ? '<strong>' : '</strong>';
      isStrong = !isStrong;
    }
    else
    {
      outputHtml += currLetter;
    }
  }
  return outputHtml;

};

//outputNextMessage();
