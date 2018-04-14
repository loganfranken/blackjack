async function chipPlayerChoice(roundCount, choiceCount, gameState)
{
  gameState.dialogLevel++;

  for(let i = 0; i < dialogChoices.length; i++)
  {
    if(dialogChoices[i].filter(gameState))
    {
      let dialogChoice = dialogChoices[i];
      dialogChoices.splice(i, 0);
      return await dialogChoice.action();
    }
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

const dialogChoices = [

  {
    filter: (state) => (state.dialogLevel === 1),
    action: async () => {
      await chip("Now you get to make a *choice*...");
      await chip("You can *hit* and take another card.");
      await chip("Or you can *stand* and I'll start dealing myself cards until I reach *17*.");
      await chip("Sooo, do you want to hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  {
    filter: (state) => (state.dialogLevel === 2),
    action: async () => {
      await chip("Same choice again: hit or stand?", true);
      return getStandardPlayerChoice();
    },
  },

  {
    filter: (state) => (state.dialogLevel === 3),
    action: async () => {
      await chip("You know the drill: hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  {
    filter: (state) => (state.dialogLevel === 4),
    action: async () => {
      await chip("Hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  {
      filter: (state) => (state.dialogLevel === 5),
      action: async () => {
        await chip("How are you doing today?", true);
        return getPlayerChoice(
          "Pretty good!", "Not so great.",
          "That's great!", "Oh no, sorry to hear that."
        );
      }
  },

  {
    filter: (state) => (state.dialogLevel === 7),
    action: async () => {
      await chip("Have you been playing blackjack long?", true);
      return getPlayerChoice(
        "Oh yeah, I'm an expert.", "Nah, just getting started.",
        "Dang, I knew it!", "Oh, great! Welcome to the game!"
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 8),
    action: async () => {
      await chip("Nice weather this afternoon, right?", true);
      return getPlayerChoice(
        "Oh yeah, I've been loving the sun.", "You think so? It's so dreary and overcast.",
        "I just love a little sun on my plastic!", "Oh. Yeah. Well, the cool weather is better for my plastic."
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 9),
    action: async () => {
      await chip("What are you going to do with your winnings?", true);
      return getPlayerChoice(
        "Put them right in the bank.", "Blow them on something fun.",
        "Wow, so practical!", "Well, you only live once."
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 10),
    action: async () => {
      await chip("Are you feeling lucky today?", true);
      return getPlayerChoice(
        "Oh yeah!", "No way.",
        "That's the spirit!", "Not with that attitude!"
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 11),
    action: async () => {
      await chip("Do you think it's usually better to hit or stand?", true);
      return getPlayerChoice(
        "Better to stand.", "Always hit!",
        "Better safe than sorry, right?", "Got to take the risk!"
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 12),
    action: async () => {
      await chip("Do you believe in fate?", true);
      return getPlayerChoice(
        "Yes, I think we are all on a predetermined path.", "No, our actions determine our path in life.",
        "Wow, I wonder what's in store for the both of us.", "How exciting!"
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 13),
    action: async () => {
      await chip("Do you think you'll win this round?", true);
      return getPlayerChoice(
        "Yes, I'm sure of it.", "No, probably not.",
        "How confident!", "You gotta have hope!"
      );
    }
  }

];
