import { convertMessageToHtml } from '../Utility';
import hidePlayerControls from './hidePlayerControls';
import PlayerMove from '../PlayerMove';
import showPlayerControls from './showPlayerControls';

export default (hitPlayerResponse, standPlayerResponse, state) => {

  const hitButton = state.domElements.hitButton;
  const standButton = state.domElements.standButton;

  hitButton.innerHTML = convertMessageToHtml(hitPlayerResponse);
  standButton.innerHTML = convertMessageToHtml(standPlayerResponse);

  return new Promise((resolve, reject) => {

    const onClickHitButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      hidePlayerControls(state);
      resolve(PlayerMove.Hit);
    };

    const onClickStandButton = () => {
      hitButton.removeEventListener('click', onClickHitButton);
      standButton.removeEventListener('click', onClickStandButton);
      hidePlayerControls(state);
      resolve(PlayerMove.Stand);
    };

    hitButton.addEventListener('click', onClickHitButton);
    standButton.addEventListener('click', onClickStandButton);

    // Display the controls
    showPlayerControls(state);

  });

};
