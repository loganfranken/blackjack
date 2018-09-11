// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {

  let currentIndex = array.length;

  while (0 !== currentIndex)
  {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

}

const halt = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(); }, timeout);
  });
}

const convertMessageToHtml = (message) => {

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

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Source: https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
const getRandomElement = (items) => {
  return items[Math.floor(Math.random()*items.length)];
}
