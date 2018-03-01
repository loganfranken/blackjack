const updatePotDisplay = () => {

  let displayPot = playerPot;

  if(playerPot > 999)
  {
    displayPot = '999';
  }
  else if(playerPot < 100)
  {
    displayPot = `<span class="leading-zero">0</span>${playerPot}`;
  }
  else if(playerPot < 10)
  {
    displayPot = `<span class="leading-zero">00</span>${playerPot}`;
  }

  domElements.scoreDisplay.innerHTML = displayPot;
};
