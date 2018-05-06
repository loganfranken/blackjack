async function chipPlayerChoice(roundCount, choiceCount, gameState)
{
  gameState.dialogLevel++;

  for(let i = 0; i < dialogChoices.length; i++)
  {
    if(dialogChoices[i].filter(gameState))
    {
      let dialogChoice = dialogChoices[i];
      dialogChoices.splice(i, 1);
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
    standChipResponse: "Alright, let's look at that hidden card."
  };
}

function getPlayerChoice(firstStatement, firstResponse, firstAction, secondStatement, secondResponse, secondAction)
{
  let rand = Math.round(Math.random());

  if(rand)
  {
    return {
      hitPlayerResponse: `${firstStatement} *Hit*`,
      standPlayerResponse: `${secondStatement} *Stand*`,
      hitChipResponse: `${firstResponse}`,
      standChipResponse: `${secondResponse}`,
      hitAction: firstAction,
      standAction: secondAction
    };
  }

  return {
    hitPlayerResponse: `${secondStatement} *Hit*`,
    standPlayerResponse: `${firstStatement} *Stand*`,
    hitChipResponse: `${secondResponse}`,
    standChipResponse: `${firstResponse}`,
    hitAction: secondAction,
    standAction: firstAction
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
          "Pretty good!", "That's great!", (state) => { state.dialogKeys['good-day'] = true; },
          "Not so great.", "Oh no, sorry to hear that.", (state) => { state.dialogKeys['bad-day'] = true; }
        );
      }
  },

  {
    filter: (state) => (state.dialogKeys['good-day']),
    action: async () => {
      await chip("Any reason you're in such a good mood?", true);
      return getPlayerChoice(
        "Yes, it's a big day for me!", "Oh, wow!", null,
        "Nope, just feeling good!", "How nice!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogKeys['bad-day']),
    action: async () => {
      await chip("What's bringing you down today?", true);
      return getPlayerChoice(
        "I just woke up feeling terrible.", "Ouch, hopefully you'll feel better.", null,
        "I don't really want to talk about it.", "Oh. I totally understand. Sorry.", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 7),
    action: async () => {
      await chip("Do you think I'm good at this?", true);
      return getPlayerChoice(
        "Yeah, you're great!", "Really? Thanks!", (state) => { state.mood++; },
        "Honestly, not really.", "Oh. Well. That's honest.", (state) => { state.mood--; }
      );
    }
  },

  {
    filter: (state) => (state.mood > 0),
    action: async () => {
      await chip("You're really nice, you know?", true);
      return getPlayerChoice(
        "Aww, thanks!", "No, thank *you*!", null,
        "Oh, no, I can be a real jerk.", "What? I don't see that at all.", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 7),
    action: async () => {
      await chip("Have you been playing blackjack long?", true);
      return getPlayerChoice(
        "Oh yeah, I'm an expert.", "Dang, I knew it!", null,
        "Nah, just getting started.", "Oh, great! Welcome to the game!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 8),
    action: async () => {
      await chip("Nice weather this afternoon, right?", true);
      return getPlayerChoice(
        "Oh yeah, I've been loving the sun.", "I just love a little sun on my plastic!", null,
        "You think so? It's so dreary and overcast.", "Oh. Yeah. Well, the cool weather is better for my plastic.", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 9),
    action: async () => {
      await chip("What are you going to do with your winnings?", true);
      return getPlayerChoice(
        "Put them right in the bank.", "Wow, so practical!", null,
        "Blow them on something fun.", "Well, you only live once.", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 10),
    action: async () => {
      await chip("Are you feeling lucky today?", true);
      return getPlayerChoice(
        "Oh yeah!", "That's the spirit!", null,
        "No way.", "Not with that attitude!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 11),
    action: async () => {
      await chip("Do you think it's usually better to hit or stand?", true);
      return getPlayerChoice(
        "Better to stand.", "Better safe than sorry, right?", null,
        "Always hit!", "Got to take the risk!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 12),
    action: async () => {
      await chip("Do you believe in fate?", true);
      return getPlayerChoice(
        "Yes, I think we are all on a predetermined path.", "Wow, I wonder what's in store for the both of us.", null,
        "No, our actions determine our path in life.", "How exciting!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 13),
    action: async () => {
      await chip("Do you think you'll win this round?", true);
      return getPlayerChoice(
        "Yes, I'm sure of it.", "How confident!", null,
        "No, probably not.", "You gotta have hope!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 14),
    action: async () => {
      await chip("Would you want to know how you would die?", true);
      return getPlayerChoice(
        "Yeah, it would be better to just know.", "It's true, it would no longer be a question.", null,
        "No, I wouldn't want that always on my mind.", "Yeah, it could really wear on you.", null
      );
    }
  },

  {
    filter: (state) => (state.dialogLevel === 15),
    action: async () => {
      await chip("Are you responsible for your own actions?", true);
      return getPlayerChoice(
        "Yes, I have shaped my life.", "What about the things out of your control?", null,
        "No, external forces have shaped my life.", "What about the things in your control?", null
      );
    }
  }

];
