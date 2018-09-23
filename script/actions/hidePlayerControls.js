export default (state) => {
  state.domElements.playerControls.className = '';
  state.domElements.playerControlButtons.forEach((button) => button.blur());
};
