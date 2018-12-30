import chip from './chip';

export default async function chipRoundStart(roundCount)
{
  if(roundCount === 0)
  {
    await chip("Hiya! My name's *Chip*! Let's play some *Blackjack*! (Press *Enter*, *Spacebar*, or *click* anywhere)");
    await chip("It's easy: just try and get a *higher score* than me.");
    await chip("But *don't go over 21*!");
  }
  else
  {
    await chip("Next round!");
  }
}
