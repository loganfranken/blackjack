const DialogManager = class {

  constructor(domElement)
  {
    this.currMessageIndex = 0;
    this.domElement = domElement;
    this.isSkipping = false;
    this.isTalking = false;
    this.onFinished = null;

    const self = this;
    document.addEventListener('keydown', (event) => {
      if(event.keyCode === 13)
      {
        self.advanceMessage();
      }
    });
  }

  outputMessage(message)
  {
    this.isTalking = true;

    return new Promise((resolve, reject) => {

      this.onFinished = resolve;

      let currIndex = 0;
      const length = message.length;

      const outputNextCharacter = () => {

          if(this.isSkipping)
          {
            this.domElement.innerHTML = this.convertMessageToHtml(message);
            this.isSkipping = false;
            this.isTalking = false;
            return;
          }

          const character = message[currIndex];
          this.domElement.innerHTML = this.convertMessageToHtml(message.slice(0, currIndex + 1));
          currIndex++;

          let timeout = 30;
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
            this.isTalking = false;
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

  advanceMessage()
  {
    if(this.isTalking)
    {
      if(!this.isSkipping)
      {
        this.isSkipping = true;
      }
    }
    else
    {
      if(this.onFinished != null)
      {
        this.onFinished();
      }

      this.onFinished = null;
    }
  }

};
