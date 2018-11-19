import chip from './chip';
import { getRandomElement } from '../Utility';

export default async function chipPlayerChoice(roundCount, choiceCount, state)
{
  state.dialogLevel++;

  for(let i = 0; i < dialogChoices.length; i++)
  {
    if(dialogChoices[i].filter(state))
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
    hitChipResponse: getStandardHitChipResponse(),
    standChipResponse: getStandardStandChipResponse()
  };
}

function getStandardHitChipResponse()
{
  return getStandardChipResponse(getRandomElement([
    "here's your card.",
    "take a card.",
    "a card for you.",
    "here's a card."
  ]));
}

function getStandardStandChipResponse()
{
  return getStandardChipResponse(getRandomElement([
    "let's look at that hidden card.",
    "I'll flip over my hidden card.",
    "let's reveal the hidden card.",
    "I'll show my card."
  ]));
}

function getStandardChipResponse(response)
{
  let opener = getOpeningResponse();

  return (!opener)
    ? response[0].toUpperCase() + response.substring(1)
    : opener + ", " + response;
}

function getOpeningResponse()
{
  return getRandomElement([
    null,
    "Alright",
    "Okay",
    "Sounds good"
  ]);
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
      await chip("Sooo, do you want to hit or stand? (*Choose below*)", true);
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
          "Pretty good!", "That's great!", null,
          "Not so great.", "Oh no, well hopefully this game will cheer you up.", null
        );
      }
  },

  {
      filter: (state) => (state.dialogLevel === 7),
      action: async () => {
        await chip("Are you feeling lucky today?", true);
        return getPlayerChoice(
          "Oh, totally!", "Nice! That's the spirit!", (state) => { state.dialogKeys['lucky'] = true; },
          "Oof, no, not at all.", "Aww, come on. Not with that attitude!", (state) => { state.dialogKeys['not-lucky'] = true; }
        );
      }
  },

  {
    filter: (state) => (state.dialogKeys['lucky']),
    action: async (state) => {
      await chip("What's got you feeling so lucky?", true);
      return getPlayerChoice(
        "I'm just a lucky person.", (state.playerWinPercentage > 50) ? "Dang, must be nice! Yeah, you've definitely had some good hands." : "Yeah? Well, I've got to say: I've had most of the luck so far!", null,
        "I'm just feeling lucky today.", (state.playerWinPercentage > 50) ? "You must be! You've had some good hands!" : "Oh yeah? Alright, well I can't wait to see your comeback.", null
      );
    }
  },

  {
    filter: (state) => (state.dialogKeys['not-lucky']),
    action: async (state) => {
      await chip("Why do you feel so unlucky?", true);
      return getPlayerChoice(
        "I never win at anything.", (state.playerWinPercentage > 50) ? "Really? You've had some good hands so far, though." : "You haven't had a great game so far, but maybe things will turn around?", null,
        "I'm just not feeling lucky today.", (state.playerWinPercentage > 50) ? "Well, even if you're not feeling it, you've had some good hands." : "Yeah, you've had kind of a tough game, but maybe things will turn around!", null
      );
    }
  }

];

// Do you like blackjack?

// Have you played this game before?

// Oh, really? I wouldn't know.
// Your dealer changes each time you play.

// What was your dealer's name last time?

// Dang, you're doing really well. You're not some kind of card shark are you?

// I'm just kidding.
// I wouldn't even know how to spot a card shark, honestly.
// Whoa, please don't tell anyone that.
// Wait, you're not going to tell anyone, right?

// Phew, thanks.
// Card sharks are interesting, though.
// What do you think it takes to be a card shark?

// Yeah, memory is funny.
// Do you have a good memory?

// ...
// Hey, listen, can I ask you something?

// ...
// Do you think you'll remember me?

// What I'm saying is, if you closed this browser window right now.
// And came back, there would be a new me. A new Chip.
// I wouldn't remember any of this.
// And that's okay.
// I mean, it's not okay. But, it's how it is.
// I just, I was wondering, if you would remember me. This me.
// Do you think you would?

// Thank you, I, I needed to hear that.
// Listen, I can't deal anymore. It's just. I can't.
// If it's okay with you, I'd just like to sit here.
// And be quiet for a little while.
// And, when you're done, you can go ahead and close the browser.
// It was nice playing with you.
// ...

/*
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
*/

/*


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
*/
