async function chipPlayerChoice(roundCount, choiceCount)
{
  if(roundCount === 1 && choiceCount === 0)
  {
    await chip("You know the drill: hit or stand? And, hey, how are you doing today?", true);
    return {
      hitPlayerResponse: "Great! *Hit me!*",
      standPlayerResponse: "Terrible. *I'll stand*",
      hitChipResponse: "That's great! Here's your card!",
      standChipResponse: "Oh no, sorry to hear that."
    };
  }
  else
  {
    await chip("Now you get to make a *choice*...");
    await chip("You can *hit* and take another card.");
    await chip("Or you can *stand* and I'll start dealing myself cards.");
    await chip("Sooo, do you want to hit or stand?", true);
    return {
      hitPlayerResponse: "*Hit*",
      standPlayerResponse: "*Stand*",
      hitChipResponse: "Alright, here's your card.",
      standChipResponse: "Alright, another card for me."
    };
  }
}
