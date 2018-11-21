import chip from './chip';

export default async function(state)
{
  if(state.playerPot <= 0)
  {
    await chip(`Oh no! That's game over!`);
    await chip(`Better luck next time!`);
  }
  else if(state.playerPot >= 999)
  {
    await chip(`Oh, uhh, huh.`);
    await chip(`This is awkward.`);
    await chip(`But, umm...`);
    await chip(`We're out of money?`);
    await chip(`Yeah, you, umm, won all of the money?`);
    await chip(`Sorry.`);
    await chip(`So that's it.`);
  }

  await chip(`...`);
  await chip(`...`);
  await chip(`Oh, so I'll just stay here.`);
  await chip(`But you can close the window or refresh to start a new game.`);
  await chip(`...`);
  await chip(`...yeah.`);
  await chip(`Alright, well, whenever you're ready.`);
  await chip(`...`);
}
