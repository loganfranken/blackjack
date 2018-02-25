async function chipPlayerChoice(roundCount, choiceCount)
{
  if(roundCount === 0 && choiceCount === 0)
  {
    await chip("Now you get to make a *choice*...");
    await chip("You can *hit* and take another card.");
    await chip("Or you can *stand* and I'll start dealing myself cards until I reach *17*.");
    await chip("Sooo, do you want to hit or stand?", true);
    return {
      hitPlayerResponse: "*Hit*",
      standPlayerResponse: "*Stand*",
      hitChipResponse: "Alright, here's your card.",
      standChipResponse: {
        holeCard: "Alright, let's look at that hidden card.",
        newCard: "Another for me."
      }
    };
  }
  else if(roundCount === 1 && choiceCount === 0)
  {
    await chip("You know the drill: hit or stand?", true);
    return {
      hitPlayerResponse: "*Hit*",
      standPlayerResponse: "*Stand*",
      hitChipResponse: "Alright, here's your card.",
      standChipResponse: {
        holeCard: "Alright, let's look at that hidden card.",
        newCard: "Another for me."
      }
    };
  }
  else if(roundCount === 1 && choiceCount === 1)
  {
    await chip("Same choice again! Hit or stand?", true);
    return {
      hitPlayerResponse: "*Hit*",
      standPlayerResponse: "*Stand*",
      hitChipResponse: "Alright, here's your card.",
      standChipResponse: {
        holeCard: "Alright, let's look at that hidden card.",
        newCard: "Another for me."
      }
    };
  }
  else
  {
    await chip("Hit or stand?", true);
    return {
      hitPlayerResponse: "*Hit*",
      standPlayerResponse: "*Stand*",
      hitChipResponse: "Alright, here's your card.",
      standChipResponse: {
        holeCard: "Alright, let's look at that hidden card.",
        newCard: "Another for me."
      }
    };
  }
}
