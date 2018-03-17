async function chipPlayerChoice(roundCount, choiceCount, gameState)
{
  switch(gameState.dialogLevel++)
  {
    case 0:
      await chip("Now you get to make a *choice*...");
      await chip("You can *hit* and take another card.");
      await chip("Or you can *stand* and I'll start dealing myself cards until I reach *17*.");
      await chip("Sooo, do you want to hit or stand?", true);
      return getStandardPlayerChoice();

    case 1:
      await chip("Same choice again: hit or stand?", true);
      return getStandardPlayerChoice();

    case 2:
      await chip("You know the drill: hit or stand?", true);
      return getStandardPlayerChoice();

    case 3:
      await chip("Hit or stand?", true);
      return getStandardPlayerChoice();

    case 4:
      await chip("How are you doing today?", true);
      return {
        hitPlayerResponse: "Pretty good! *Hit*",
        standPlayerResponse: "Not so great. *Stand*",
        hitChipResponse: "That's great!",
        standChipResponse: {
          holeCard: "Oh no, sorry to hear that.",
          newCard: "Oh no, sorry to hear that."
        }
      };

    case 6:
      await chip("Have you been playing blackjack long?", true);
      return {
        hitPlayerResponse: "Oh yeah, I'm an expert. *Hit*",
        standPlayerResponse: "Nah, just getting started. *Stand*",
        hitChipResponse: "Dang, I knew it!",
        standChipResponse: {
          holeCard: "Oh, great! Welcome to the game!",
          newCard: "Oh, great! Welcome to the game!"
        }
      };

    case 7:
      await chip("Nice weather this afternoon, right?", true);
      return {
        hitPlayerResponse: "Oh yeah, I've been loving the sun. *Hit*",
        standPlayerResponse: "You think so? It's so dreary and overcast. *Stand*",
        hitChipResponse: "I just love a little sun on my plastic!",
        standChipResponse: {
          holeCard: "Oh. Yeah. Well, the cool weather is better for my plastic.",
          newCard: "Oh. Yeah. Well, the cool weather is better for my plastic."
        }
      };

    case 8:
      await chip("What are you going to do with your winnings?", true);
      return {
        hitPlayerResponse: "Put them right in the bank. *Hit*",
        standPlayerResponse: "Blow them on something fun. *Stand*",
        hitChipResponse: "Wow, so practical!",
        standChipResponse: {
          holeCard: "Well, you only live once.",
          newCard: "Well, you only live once."
        }
      };
  }

  // Default choice
  await chip("Hit or stand?", true);
  return getStandardPlayerChoice();
}

function getStandardPlayerChoice()
{
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
