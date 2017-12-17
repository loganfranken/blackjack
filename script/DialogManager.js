const DialogManager = class {

  constructor(domElement)
  {
    this.currMessageIndex = 0;
    this.domElement = domElement;
  }

  outputMessage(message)
  {
    return new Promise((resolve, reject) => {

      let currIndex = 0;
      const length = message.length;

      const outputNextCharacter = () => {

          const character = message[currIndex];
          this.domElement.innerHTML = this.convertMessageToHtml(message.slice(0, currIndex + 1));
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
  }

  convertMessageToHtml(message)
  {
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
  }

};
