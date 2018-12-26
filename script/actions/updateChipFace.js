import ChipEmotion from '../ChipEmotion';

export default function(emotion, state)
{
  var dealerPicture = state.domElements.dealerPicture;

  switch(emotion)
  {
    case ChipEmotion.Default:
      dealerPicture.className = 'default';
      break;

    case ChipEmotion.Happy:
      dealerPicture.className = 'happy';
      break;

    case ChipEmotion.Astonished:
      dealerPicture.className = 'astonished';
      break;

    case ChipEmotion.Awkward:
      dealerPicture.className = 'awkward';
      break;

    case ChipEmotion.Bummed:
      dealerPicture.className = 'bummed';
      break;

    case ChipEmotion.Concerned:
      dealerPicture.className = 'concerned';
      break;
  }
}
