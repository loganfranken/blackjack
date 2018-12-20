import ChipEmotion from '../ChipEmotion';

export default function(emotion, state)
{
  var dealerPicture = state.domElements.dealerPicture;

  switch(emotion)
  {
    case ChipEmotion.Default:
      dealerPicture.className = '';
      break;

    case ChipEmotion.Happy:
      dealerPicture.className = 'happy';
      break;
  }
}
