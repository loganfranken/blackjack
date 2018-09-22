export default (state) => {

  let scoreDisplay = state.domElements.scoreDisplay;
  let scoreDisplayWrapper = state.domElements.scoreDisplay.parentElement;

  // Update the pot text
  let displayPot = state.playerPot;

  if(state.playerPot > 999)
  {
    displayPot = '999';
  }
  else if(state.playerPot < 100)
  {
    displayPot = `<span class="leading-zero">0</span>${state.playerPot}`;
  }
  else if(state.playerPot < 10)
  {
    displayPot = `<span class="leading-zero">00</span>${state.playerPot}`;
  }

  scoreDisplay.innerHTML = displayPot;

  // Update the pot increase/decrease class

  if(state.playerPot < state.previousPlayerPot)
  {
    // Has the pot decreased?
    scoreDisplayWrapper.classList += ' decrease';
  }

  if(state.playerPot > state.previousPlayerPot)
  {
    // Has the pot increased?
    scoreDisplayWrapper.classList += ' increase';
  }

  setTimeout(() => {
    // Reset the increase/decrease class
    scoreDisplayWrapper.classList = 'player-pot-display';
  }, 500);
};
