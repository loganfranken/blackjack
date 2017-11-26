module.exports = class {
  
  constructor(messages)
  {
    this.messages = messages;
    this.isTalking = false;
    this.isSkipping = false;
    this.currMessageIndex = 0;
  }
  
  outputMessage(message)
  {
    return new Promise((resolve, reject) => {
  
      let currIndex = 0;
      const length = message.length;
  
      const outputNextCharacter = () => {
  
          if(this.isSkipping)
          {
            dealerMessage.innerHTML = convertMessageToHtml(message);
            this.isSkipping = false;
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
  }
  
  outputNextMessage()
  {
    if(currMessageIndex >= this.messages.length)
    {
      return;
    }
  
    dealerMessage.innerHTML = '';
  
    this.isTalking = true;
    outputMessage(this.messages[this.currMessageIndex++]).then(() => {
      this.isTalking = false;
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