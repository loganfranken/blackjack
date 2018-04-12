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
      return getPlayerChoice(
        "Pretty good!", "Not so great.",
        "That's great!", "Oh no, sorry to hear that."
      );

    case 6:
      await chip("Have you been playing blackjack long?", true);
      return getPlayerChoice(
        "Oh yeah, I'm an expert.", "Nah, just getting started.",
        "Dang, I knew it!", "Oh, great! Welcome to the game!"
      );

    case 7:
      await chip("Nice weather this afternoon, right?", true);
      return getPlayerChoice(
        "Oh yeah, I've been loving the sun.", "You think so? It's so dreary and overcast.",
        "I just love a little sun on my plastic!", "Oh. Yeah. Well, the cool weather is better for my plastic."
      );

    case 8:
      await chip("What are you going to do with your winnings?", true);
      return getPlayerChoice(
        "Put them right in the bank.", "Blow them on something fun.",
        "Wow, so practical!", "Well, you only live once."
      );

    case 9:
      await chip("Are you feeling lucky today?", true);
      return getPlayerChoice(
        "Oh yeah!", "No way.",
        "That's the spirit!", "Not with that attitude!"
      );

     case 10:
        await chip("Do you think it's usually better to hit or stand?", true);
        return getPlayerChoice(
          "Better to stand.", "Always hit!",
          "Better safe than sorry, right?", "Got to take the risk!"
        );

     case 11:
        await chip("Do you believe in fate?", true);
        return getPlayerChoice(
          "Yes, I think we are all on a predetermined path.", "No, our actions determine our path in life.",
          "Wow, I wonder what's in store for the both of us.", "How exciting!"
        );
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

function getPlayerChoice(firstStatement, secondStatement, firstResponse, secondResponse)
{
  let rand = Math.round(Math.random());

  if(rand)
  {
    return {
      hitPlayerResponse: `${firstStatement} *Hit*`,
      standPlayerResponse: `${secondStatement} *Stand*`,
      hitChipResponse: `${firstResponse}`,
      standChipResponse: `${secondResponse}`
    };
  }

  return {
    hitPlayerResponse: `${secondStatement} *Hit*`,
    standPlayerResponse: `${firstStatement} *Stand*`,
    hitChipResponse: `${secondResponse}`,
    standChipResponse: `${firstResponse}`
  };
}
