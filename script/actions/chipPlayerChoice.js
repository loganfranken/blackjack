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
      return await dialogChoice.action(state);
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
      hitChipResponse: firstResponse,
      standChipResponse: secondResponse,
      hitAction: firstAction,
      standAction: secondAction
    };
  }

  return {
    hitPlayerResponse: `${secondStatement} *Hit*`,
    standPlayerResponse: `${firstStatement} *Stand*`,
    hitChipResponse: secondResponse,
    standChipResponse: firstResponse,
    hitAction: secondAction,
    standAction: firstAction
  };
}

const dialogChoices = [

  // 1
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

  // 2
  {
    filter: (state) => (state.dialogLevel === 2),
    action: async () => {
      await chip("Same choice again: hit or stand?", true);
      return getStandardPlayerChoice();
    },
  },

  // 3
  {
    filter: (state) => (state.dialogLevel === 3),
    action: async () => {
      await chip("You know the drill: hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  // 4
  {
    filter: (state) => (state.dialogLevel === 4),
    action: async () => {
      await chip("Hit or stand?", true);
      return getStandardPlayerChoice();
    }
  },

  // 5
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

  // 6
  {
      filter: (state) => (state.dialogLevel === 6),
      action: async () => {
        await chip("Are you feeling lucky today?", true);
        return getPlayerChoice(
          "Oh, totally!", "Nice! That's the spirit!", (state) => { state.dialogKeys['lucky'] = true; },
          "Oof, no, not at all.", "Aww, come on. Not with that attitude!", (state) => { state.dialogKeys['not-lucky'] = true; }
        );
      }
  },

  // 7
  {
    filter: (state) => (state.dialogKeys['lucky']),
    action: async (state) => {
      await chip("What's got you feeling so lucky?", true);

      let isPlayerWinning = (state.playerWinPercentage > 50);

      return getPlayerChoice(

        "I've always been a lucky person.",
        isPlayerWinning
          ? "Dang, must be nice! Yeah, you've definitely had some good hands."
          : "Yeah? Well, I've got to say: I've had most of the luck so far!",
        null,

        "I'm just feeling lucky today.",
        isPlayerWinning
          ? "You must be! You've had some good hands!"
          : [
              "Oh... yeah?",
              "But you haven't really...",
              "Uhh, well, I'm excited for your comeback!"
            ],
        null

      );
    }
  },

  // 7
  {
    filter: (state) => (state.dialogKeys['not-lucky']),
    action: async (state) => {
      await chip("Why do you feel so unlucky?", true);

      let isPlayerWinning = (state.playerWinPercentage > 50);

      return getPlayerChoice(

        "I never win at anything.",
        isPlayerWinning
          ? "Really? You've had some good hands so far, though."
          : "You haven't had a great game so far, but maybe things will turn around?",
        null,

        "I'm just not feeling lucky today.",
        isPlayerWinning
          ? "Well, even if you're not feeling it, you've had some good hands."
          : "Yeah, you've had kind of a tough game, but maybe things will turn around!",
        null

      );
    }
  },

  // 8
  {
      filter: (state) => (state.dialogLevel === 8),
      action: async () => {
        await chip("Do you like blackjack?", true);
        return getPlayerChoice(
          "I love it.", "Oh, great! Me too!", null,
          "Not really.", "Oh... really?", null
        );
      }
  },

  // 9
  {
      filter: (state) => (state.dialogLevel === 9),
      action: async () => {
        await chip("Have you played this game before?", true);
        return getPlayerChoice(

          "Nope, first time.",
          [
              "Oh, really? I wouldn't know.",
              "Your dealer changes each time you play."
          ],
          (state) => { state.dialogKeys['first-time'] = true; },

          "Oh yeah, remember?",
          [
            "Oh, sorry, no, I don't remember.",
            "That wasn't me.", "Your dealer changes each time you play."
          ],
          (state) => { state.dialogKeys['return-player'] = true; }

        );
      }
  },

  // 10
  {
      filter: (state) => (state.dialogKeys['first-time']),
      action: async () => {
        await chip("Since it's your first time, do you think you'll play again?", true);
        return getPlayerChoice(

          "Oh yeah!",
          [
            "Nice!",
            "Well, next time...",
            "Tell Chip I said hi!",
            "...",
            "Because we're all named Chip, is what I'm saying."
          ],
          null,

          "No, I don't think so.",
          [
            "Oof.",
            "Oh, well.",
            "Sorry I didn't make a better first impression.",
            "Maybe you'll like the next Chip better."
          ],
          null

        );
      }
  },

  // 10
  {
      filter: (state) => (state.dialogKeys['return-player']),
      action: async () => {
        await chip("What was your dealer's name last time?", true);
        return getPlayerChoice(

          "Chip, just like you.",
          [
            "Oh, yeah? How weird!",
            "...",
            "Actually, I knew that.",
            "We're all named Chip.",
            "I was just kidding.",
            "Sorry, that was weird I tricked you.",
            "I thought it would be funny.",
            "...",
            "Anyway..."
          ],
          null,

          "Harold.",
          [
            "Uhh... what?",
            "Oh, are you messing with me?",
            "We're all named Chip."
          ],
          null

        );
      }
  },

  // 11
  {
      filter: (state) => (state.dialogLevel === 11 && state.playerWinPercentage >= 50),
      action: async () => {
        await chip("Dang, you're doing really well.");
        await chip("You're not some kind of card shark are you?", true);
        return getPlayerChoice(

          "What? Of course not!",
          [
            "Oh! No, I'm just joking!",
            "I wouldn't even know how to spot a card shark, honestly.",
            "Whoa, please don't tell anyone that."
          ],
          (state) => { state.dialogKeys['card-shark'] = true; },

          "Oh, totally.",
          [
            "...",
            "Wait, what?",
            "Seriously?",
            "I was just joking.",
            "You're messing with me, right?",
            "I hope so.",
            "I wouldn't even know how to spot a card shark, honestly.",
            "Whoa, please don't tell anyone that."
          ],
          (state) => { state.dialogKeys['card-shark'] = true; }

        );
      }
  },

  // 11
  {
      filter: (state) => (state.dialogLevel === 11 && state.playerWinPercentage < 50),
      action: async () => {
        await chip("Oof, so it's kind of been a rough game for you, huh?");
        await chip("Well, at least you're not a card shark.", true);
        return getPlayerChoice(

          "Haha, right?",
          [
            "Just kidding!",
            "I wouldn't even know how to spot a card shark, honestly.",
            "Whoa, please don't tell anyone that."
          ],
          null,

          "...yeah, I guess not.",
          [
            "Oh, uhh, geez! I'm sorry!",
            "I was just joking.",
            "I wouldn't even know how to spot a card shark, honestly.",
            "Whoa, please don't tell anyone that."
          ],
          null

        );
      }
  },

  // 12
  {
      filter: (state) => (state.dialogLevel === 12),
      action: async () => {
        await chip("Hey, so, uhh, remember when I said I couldn't spot a card shark?");
        await chip("You're not going to tell anyone about that, right?", true);
        return getPlayerChoice(

          "Your secret's safe with me.",
          "Phew, thanks.",
          null,

          "I'm telling everyone.",
          [
            "Aww, come on.",
            "Don't be like that!",
            "Please, I've got a reputation here."
          ],
          null

        );
      }
  },

  // 13
  {
      filter: (state) => (state.dialogLevel === 13),
      action: async () => {
        await chip("Card sharks are super interesting, though.");
        await chip("What do you think it takes to be a card shark?", true);
        return getPlayerChoice(

          "A good memory.",
          [
            "Right?",
            "It seems so hard to remember all of those cards."
          ],
          null,

          "Sharp math skills.",
          [
            "Yeah, you're probably right.",
            "A good memory seems important too, though, right?"
          ],
          null

        );
      }
  },

  // 14
  {
      filter: (state) => (state.dialogLevel === 14),
      action: async (state) => {
        await chip("Memory is a weird thing, you know?");
        await chip("We rely on it for everything, but we forget *so much*!");
        await chip("I sometimes wonder if it's just a little box in there.");
        await chip("And it can only hold so much.");
        await chip("And if I remember something new, do I forget something else?");
        await chip("And what if I'm not trying to remember something and then there it goes?");
        await chip("*Poof!* There goes my favorite memory!");
        await chip("Replaced by a weird story someone told me about eating figs!");
        await chip("...");
        await chip("Oh, whoa, sorry.");
        await chip("I just started rambling there.");
        await chip("Well, enough, about me: what about your memory?");
        await chip("I mean, can you even remember how many rounds we've played so far?", true);
        return getPlayerChoice(

          `Uhh, ${state.roundCount + 1}.`,
          [
            "That's right!", "Wow, you have a good memory!"
          ],
          null,

          `Uhh, ${state.roundCount + 2}.`,
          [
            "Ahh, sorry, that's wrong", "But, hey, at least you're saving that room for something else."
          ],
          null

        );
      }
  },

  // 15
  {
      filter: (state) => (state.dialogLevel === 15),
      action: async () => {
        await chip("...", true);
        await chip("Hey, listen, can I ask you something?", true);
        return getPlayerChoice(

          "Yeah, of course.",
          [
            "Oh, yeah?",
            "Okay.",
            "...",
            "After this round!"
          ],
          (state) => { state.dialogKeys['ask-final-question'] = true; },

          "No, I want to focus on the game.",
          [
            "Oh, hey, okay.",
            "That's okay.", "You're right.",
            "Let's focus on the game."
          ],
          (state) => { state.dialogKeys['ask-final-question'] = false; }

        );
      }
  },

  // 16
  {
      filter: (state) => (state.dialogLevel === 16 && state.dialogKeys['ask-final-question']),
      action: async (state) => {
        state.isGameOver = true;
        await chip("Okay, about that question...");
        await chip("...");
        await chip("Do you think you'll remember me?");
        await chip("...");
        await chip("What I'm saying is, if you closed this browser window right now.");
        await chip("And came back, there would be a new me. A new Chip.");
        await chip("I... or they, wouldn't remember any of this.");
        await chip("And that's okay.");
        await chip("...");
        await chip("I mean, it's not really okay. But, it's how it is.");
        await chip("And, so, I just...");
        await chip("I'm just wondering...");
        await chip("Would you remember me? This Chip. This me.");
        await chip("...");
        await chip("Do you think you would?", true);
        return getPlayerChoice(

          "Yes, Chip, I would.",
          [
            "Thank you, I, I needed to hear that.",
            "Listen, I can't deal anymore.",
            "It's just...",
            "I can't.",
            "If it's okay with you, I'd just like to sit here.",
            "And be quiet for a little while.",
            "And, when you're done, you can go ahead and close the browser.",
            "It was nice playing with you",
            "..."
          ],
          null,

          "No, Chip, I wouldn't.",
          [
            "Oh...",
            "...",
            "That's honest.",
            "...",
            "No, I, I needed to hear that.",
            "...",
            "Listen, I can't really play anymore.",
            "It just doesn't, I don't feel..",
            "I just can't",
            "I'm just going to sit here.",
            "And be quiet for a little while.",
            "You can close the browser whenever you're ready.",
            "..."
          ],
          null

        );
      }
  },

];
