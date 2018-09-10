const updateBetDisplay = (state) => {

  let betDisplay = state.domElements.betDisplay;
  betDisplay.innerHTML = state.bet;

};
