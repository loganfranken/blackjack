import chip from './chip';
import { getRandomElement } from '../Utility';

export default async function chipPlayerChoice(roundCount, choiceCount, state)
{
  state.dialogLevel++;

  for(let i = 0; i < dialogChoices.length; i++)
  {
    if(dialogChoices[i].filter == null || dialogChoices[i].filter(state))
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
    action: async () => {
      await chip("Now you get to make a *choice*...");
      await chip("You can *hit* and take another card.");
      await chip("Or you can *stand* and I'll start dealing myself cards until I reach *17*.");
      await chip("Sooo, do you want to hit or stand? (*Choose below*)", true);
      return getStandardPlayerChoice();
    }
  },

  {
    action: async () => {
      await chip("Same choice again: hit or stand?", true);
      return getStandardPlayerChoice();
    },
  },

  {
    action: async () => {
      await chip("You know the drill: hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  {
    action: async () => {
      await chip("Hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  {
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
        "You know, I'm always in a good mood.", "Oh, how wonderful!", null,
        "It's just been a really good day.", "How nice!", null
      );
    }
  },

  {
    filter: (state) => (state.dialogKeys['bad-day']),
    action: async () => {
      await chip("What's bringing you down today?", true);
      return getPlayerChoice(
        "I've just been feeling out of it today.", "I'm sorry, hopefully you'll feel better.", null,
        "I don't really want to talk about it.", "Oh. I totally understand. Sorry.", null
      );
    }
  },

  {
      action: async () => {
        await chip("Do you like blackjack?", true);
        return getPlayerChoice(
          "Yeah, I love it.", "I could tell.", null,
          "Nah, not really.", "Oh, what? Really?", null
        );
      }
  },

  {
      action: async () => {
        await chip("Have you played this game before?", true);
        return getPlayerChoice(
          "Uhh, yeah, with you.", "Oh! No, that wasn't me, actually. It's a new dealer each time.", (state) => { state.dialogKeys['has-played'] = true; },
          "Nope, this is my first time.", "How fun!", null
        );
      }
  },

  {
      filter: (state) => (state.dialogKeys['has-played']),
      action: async () => {
        await chip("So, since you're a return player. What was your dealer's name last time?", true);
        return getPlayerChoice(
          "Chip.", "Haha, yeah, sorry, trick question: we're all named 'Chip'.", null,
          "Harold.", "What. Come on. We're all named 'Chip'.", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("Dang, you're dealing really well. You're not some kind of card shark are you?", true);
        return getPlayerChoice(
          "Uhh, umm.", "Don't worry, I'm just kidding!", null,
          "What? No!", "Oh, sorry! I was just kidding!", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("Listen, I was totally kidding about that whole card shark thing.");
        await chip("I wouldn't even know how to spot a card shark, honestly.");
        await chip("Whoa, please don't tell anyone that.");
        await chip("Wait, you're not going to tell anyone, right?", true);
        return getPlayerChoice(
          "I'm telling the world.", "Oh come on! I'm sorry I called you a card shark!", null,
          "Your secret's safe with me.", "Phew! Thanks buddy!", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("Card sharks are interesting, though.")
        await chip("What do you think it takes to be a card shark?", true);
        return getPlayerChoice(
          "Confidence.", "Yeah, that's true.", null,
          "A good memory.", "Right? You have to remember all of those cards.", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("Memory is weird.")
        await chip("Do you have a good memory?", true);
        return getPlayerChoice(
          "Pretty good, yeah.", "Yeah? That's good.", null,
          "Not really.", "Oh yeah?", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("...")
        await chip("Hey, listen, can I ask you something?", true);
        return getPlayerChoice(
          "Sure, what's up?", "Here, I'll finish out this hand first.", null,
          "Nah, sorry.", "Oh. It's okay. You're right. We're here to play.", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("Okay, so. That question.")
        await chip("...");
        await chip("Do you think you'll remember me?", true);
        return getPlayerChoice(
          "Yeah, of course.", "...", null,
          "Nah, sorry.", "...", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("What I'm saying is, if you closed this browser window right now.")
        await chip("And came back, there would be a new me. A new Chip.");
        await chip("I wouldn't remember any of this.");
        await chip("And that's okay.");
        await chip("I mean, it's not okay. But, it's how it is.");
        await chip("I just, I was wondering, if you would remember me. This me.");
        await chip("Do you think you would?");
        return getPlayerChoice(
          "Yeah, of course.", "...", null,
          "Nah, sorry.", "...", null
        );
      }
  },

  {
      filter: null,
      action: async () => {
        await chip("Thank you, I, I needed to hear that.")
        await chip("Listen, I can't deal anymore. It's just. I can't.");
        await chip("If it's okay with you, I'd just like to sit here.");
        await chip("And be quiet for a little while.");
        await chip("And, when you're done, you can go ahead and close the browser.");
        await chip("It was nice playing with you.");
        await chip("...");
      }
  }

];
