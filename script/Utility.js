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

// Source: https://codepen.io/dbushell/pen/yVQKar
const sequence = (tasks) => {
  tasks.reduce((promise, task) => promise.then(task), Promise.resolve());
}
