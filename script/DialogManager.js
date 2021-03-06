import { convertMessageToHtml, halt } from './Utility';

class DialogManager {

  constructor(domElement)
  {
    this.currMessageIndex = 0;
    this.domElement = null;
    this.isSkipping = false;
    this.isTalking = false;
    this.onFinished = null;

    const self = this;
  }

  setOutputTarget(domElement)
  {
    this.domElement = domElement;
  }

  async outputMessage(message, skipConfirm)
  {
    this.isTalking = true;
    this.isFinished = false;

    let currIndex = 0;
    const length = message.length;

    while(this.isTalking)
    {
      if(this.isSkipping)
      {
        this.domElement.innerHTML = convertMessageToHtml(message);
        this.isSkipping = false;
        this.isTalking = false;
        break;
      }

      const character = message[currIndex];
      this.domElement.innerHTML = convertMessageToHtml(message.slice(0, currIndex + 1));
      currIndex++;

      let timeout = 30;
      if(character === '.' || character === '?' || character === '!')
      {
        timeout = 200;
      }

      if(currIndex < length)
      {
        await halt(timeout);
      }
      else
      {
        this.isTalking = false;
      }
    }

    if(!skipConfirm)
    {
      await new Promise(resolve => {
        this.onFinished = resolve;
      });
    }
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

window.DialogManager = window.DialogManager || (new DialogManager());
export default window.DialogManager;
