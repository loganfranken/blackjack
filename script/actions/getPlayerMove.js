const getPlayerMove = (hitPlayerResponse, standPlayerResponse) => {

  const hitButton = domElements.hitButton;
  const standButton = domElements.standButton;

  hitButton.innerHTML = convertMessageToHtml(hitPlayerResponse);
  standButton.innerHTML = convertMessageToHtml(standPlayerResponse);

  return new Promise((resolve, reject) => {

    const onClickHitButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      hidePlayerControls();
      resolve(PlayerMove.Hit);
    };

    const onClickStandButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      hidePlayerControls();
      resolve(PlayerMove.Stand);
    };

    hitButton.addEventListener('click', onClickHitButton);
    standButton.addEventListener('click', onClickStandButton);

    // Display the controls
    showPlayerControls();

  });

};
