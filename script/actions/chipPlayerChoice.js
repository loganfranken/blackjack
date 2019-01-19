import chip from './chip';
import ChipEmotion from '../ChipEmotion';
import { getRandomElement } from '../Utility';
import updateChipFace from './updateChipFace';

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

function getPlayerChoice(firstStatement, firstResponse, secondStatement, secondResponse)
{
  let rand = Math.round(Math.random());

  if(rand)
  {
    return {
      hitPlayerResponse: `${firstStatement} *Hit*`,
      standPlayerResponse: `${secondStatement} *Stand*`,
      hitChipResponse: firstResponse,
      standChipResponse: secondResponse
    };
  }

  return {
    hitPlayerResponse: `${secondStatement} *Hit*`,
    standPlayerResponse: `${firstStatement} *Stand*`,
    hitChipResponse: secondResponse,
    standChipResponse: firstResponse
  };
}

const dialogChoices = [

  // 1
  {
    filter: (state) => (state.dialogLevel === 1),
    action: async () => {
      await chip("Now you get to make a *choice*...");
      await chip("You can *hit* and take another card.");
      await chip("Or you can *stand* and I'll start dealing myself cards until I go past *17*.");
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
      action: async (state) => {
        await chip("How are you doing today?", true);
        return getPlayerChoice(

          "Pretty good!",
          [
            () => { updateChipFace(ChipEmotion.Happy, state); },
            "That's great!",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ],

          "Not so great.",
          [
            () => { updateChipFace(ChipEmotion.Bummed, state); },
            "Oh no, well hopefully this game will cheer you up.",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ]

        );
      }
  },

  // 6
  {
      filter: (state) => (state.dialogLevel === 6),
      action: async (state) => {
        await chip("Are you feeling lucky today?", true);
        return getPlayerChoice(

          "Oh, totally!",
          [
            () => { updateChipFace(ChipEmotion.Happy, state); },
            "Nice! That's the spirit!",
            () => { updateChipFace(ChipEmotion.Default, state); },
            () => { state.dialogKeys['lucky'] = true; }
          ],

          "Oof, no, not at all.",
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Aww, come on. Not with that attitude!",
            () => { updateChipFace(ChipEmotion.Default, state); },
            () => { state.dialogKeys['not-lucky'] = true; }
          ]

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

        "I'm just feeling lucky today.",
        isPlayerWinning
          ? "You must be! You've had some good hands!"
          : [
              () => { updateChipFace(ChipEmotion.Concerned, state); },
              "Oh... yeah?",
              () => { updateChipFace(ChipEmotion.Questioning, state); },
              "But you haven't really...",
              "Uhh, well, I'm excited for your comeback!",
              () => { updateChipFace(ChipEmotion.Default, state); }
            ]

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
          ? [
              () => { updateChipFace(ChipEmotion.Questioning, state); },
              "Really? You've had some good hands so far, though.",
              () => { updateChipFace(ChipEmotion.Default, state); }
            ]
          : [
              () => { updateChipFace(ChipEmotion.Questioning, state); },
              "Well, you haven't had a great game so far...",
              () => { updateChipFace(ChipEmotion.Default, state); },
              "But maybe things will turn around!"
            ],

        "I'm just not feeling lucky today.",
        isPlayerWinning
          ? "Well, even if you're not feeling it, you've had some good hands."
          : [
              () => { updateChipFace(ChipEmotion.Concerned, state); },
              "Yeah, you've had kind of a tough game, but maybe things will turn around!",
              () => { updateChipFace(ChipEmotion.Default, state); }
            ]

      );
    }
  },

  // 8
  {
      filter: (state) => (state.dialogLevel === 8),
      action: async (state) => {
        await chip("Do you like blackjack?", true);
        return getPlayerChoice(

          "I love it.",
          [
            () => { updateChipFace(ChipEmotion.Happy, state); },
            "Oh, great! Me too!",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ],

          "Not really.",
          [
            () => { updateChipFace(ChipEmotion.Bummed, state); },
            "Oh...",
            "...really?",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Then, why are you...",
            "...",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "You know what...",
            "That's okay.",
            "To each their own, right?",
            "All I know is...",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "I'm enjoying playing with you.",
            "And that's how I feel about it!"
          ]

        );
      }
  },

  // 9
  {
      filter: (state) => (state.dialogLevel === 9),
      action: async (state) => {
        await chip("Have you played this game before?", true);
        return getPlayerChoice(

          "Nope, first time.",
          [
              () => { updateChipFace(ChipEmotion.Questioning, state); },
              "Oh, really? I wouldn't know.",
              "Your dealer changes each time you play.",
              () => { updateChipFace(ChipEmotion.Default, state); },
              () => { state.dialogKeys['first-time'] = true; },
          ],

          "Oh yeah, remember?",
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Oh, sorry, no, I don't remember.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "That wasn't me.",
            "Your dealer changes each time you play.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            () => { state.dialogKeys['return-player'] = true; }
          ]

        );
      }
  },

  // 10
  {
      filter: (state) => (state.dialogKeys['first-time']),
      action: async (state) => {
        await chip("Since it's your first time, do you think you'll play again?", true);
        return getPlayerChoice(

          "Oh yeah!",
          [
            "Nice!",
            () => { updateChipFace(ChipEmotion.Happy, state); },
            "I'm glad I made such a good first impression!",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "Oh, I mean, not that I'm the reason you would play again.",
            "I mean, I might be, but...",
            "...",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Anyway...",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "How about those cards!"
          ],

          "No, I don't think so.",
          [
            () => { updateChipFace(ChipEmotion.Bummed, state); },
            "Oof.",
            "Oh, well.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Sorry I didn't make a better first impression.",
            "...",
            "That's okay, though.",
            "That's good feedback.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Yeah.",
            "Good feedback.",
            "...",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "Okay, Chip, game face!",
            "Alright, let's get back to it."
          ]

        );
      }
  },

  // 10
  {
      filter: (state) => (state.dialogKeys['return-player']),
      action: async (state) => {
        await chip("What was your dealer's name last time?", true);
        return getPlayerChoice(

          "Chip, just like you.",
          [
            "Oh, yeah? How weird!",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "...",
            "Actually, I knew that.",
            "We're all named Chip.",
            "I was just kidding.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Sorry, that was weird I tricked you.",
            "I thought it would be funny.",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "...",
            "Anyway...",
            () => { updateChipFace(ChipEmotion.Default, state); },
          ],

          "Harold.",
          [
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Uhh... what?",
            "Oh, are you messing with me?",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "We're all named Chip.",
            "Oh, you are messing with me, huh?",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "Ahh, good one!"
          ]

        );
      }
  },

  // 11
  {
      filter: (state) => (state.dialogLevel === 11 && state.playerWinPercentage >= 50),
      action: async (state) => {
        await chip("Dang, you're doing really well.");
        await chip("You're not some kind of card shark are you?", true);
        return getPlayerChoice(

          "What? Of course not!",
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Oh! No, I'm just joking!",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "I wouldn't even know how to spot a card shark, honestly.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Whoa, please don't tell anyone that.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            () => { state.dialogKeys['card-shark'] = true; }
          ],


          "Oh, totally.",
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "...",
            "Wait, what?",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Seriously?",
            "I was just joking.",
            "You're messing with me, right?",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "I hope so.",
            "I wouldn't even know how to spot a card shark, honestly.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Whoa, please don't tell anyone that.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            () => { state.dialogKeys['card-shark'] = true; }
          ]

        );
      }
  },

  // 11
  {
      filter: (state) => (state.dialogLevel === 11 && state.playerWinPercentage < 50),
      action: async (state) => {
        await chip("Oof, so it's kind of been a rough game for you, huh?");
        await chip("Well, at least you're not a card shark.", true);
        return getPlayerChoice(

          "Haha, right?",
          [
            () => { updateChipFace(ChipEmotion.Happy, state); },
            "Just kidding!",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "Sorry, that was kind of mean.",
            "I wouldn't even know how to spot a card shark, honestly.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Whoa, please don't tell anyone that.",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ],

          "...yeah, I guess not.",
          [
            () => { updateChipFace(ChipEmotion.Bummed, state); },
            "Oh, uhh, geez! I'm sorry!",
            () => { updateChipFace(ChipEmotion.Awkward, state); },
            "I was just joking.",
            "I wouldn't even know how to spot a card shark, honestly.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Whoa, please don't tell anyone that.",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ]

        );
      }
  },

  // 12
  {
      filter: (state) => (state.dialogLevel === 12),
      action: async (state) => {
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("Hey, so...");
        updateChipFace(ChipEmotion.Questioning, state);
        await chip("You're not going to tell anyone about the card shark thing, right?", true);
        return getPlayerChoice(

          "Your secret's safe with me.",
          [
            () => { updateChipFace(ChipEmotion.Default, state); },
            "Phew, thanks."
          ],

          "I'm telling everyone.",
          [
            () => { updateChipFace(ChipEmotion.Bummed, state); },
            "Aww, come on.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Don't be like that!",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Please, I've got a reputation here!",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "...",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Nah, come on, you won't tell, right?",
            "...",
            "After all of the blackjack we've been through?",
            "...",
            "I'm pretty sure you're messing with me.",
            "Pretty sure.",
            "Yeah, good one!",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ]

        );
      }
  },

  // 13
  {
      filter: (state) => (state.dialogLevel === 13),
      action: async (state) => {
        await chip("Card sharks are super interesting, though.");
        await chip("What do you think it takes to be a card shark?", true);
        return getPlayerChoice(

          "A good memory.",
          [
            "Right?",
            "It seems so hard to remember all of those cards."
          ],

          "Sharp math skills.",
          [
            "Yeah, you're probably right.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "A good memory seems important too, though, right?",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ]

        );
      }
  },

  // 14
  {
      filter: (state) => (state.dialogLevel === 14),
      action: async (state) => {
        await chip("Memory is a weird thing, you know?");
        updateChipFace(ChipEmotion.Questioning, state);
        await chip("We rely on it for everything, but we forget *so much*!");
        await chip("I sometimes wonder if it's just a little box in there.");
        await chip("And it can only hold so much.");
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("And if I remember something new, do I forget something else?");
        await chip("And what if I'm not trying to remember something and then there it goes?");
        updateChipFace(ChipEmotion.Bummed, state);
        await chip("*Poof!* There goes my favorite memory!");
        await chip("Replaced by a weird story someone told me about eating figs!");
        updateChipFace(ChipEmotion.Awkward, state);
        await chip("...");
        await chip("Oh, whoa, sorry.");
        await chip("I just started rambling there.");
        updateChipFace(ChipEmotion.Default, state);
        await chip("Well, enough, about me: what about your memory?");
        await chip("I mean, can you even remember how many rounds we've played so far?", true);
        return getPlayerChoice(

          `Uhh, ${state.roundCount + 1}.`,
          [
            () => { updateChipFace(ChipEmotion.Happy, state); },
            "That's right!",
            "Wow, you have a good memory!",
            () => { updateChipFace(ChipEmotion.Default, state); }
          ],

          `Uhh, ${state.roundCount + 2}.`,
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Ahh, sorry, that's wrong.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "But, hey, at least you're saving that room for something else."
          ]

        );
      }
  },

  // 15
  {
      filter: (state) => (state.dialogLevel === 15),
      action: async (state) => {
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("...");
        await chip("Hey, listen, can I ask you something?", true);
        updateChipFace(ChipEmotion.Questioning, state);
        return getPlayerChoice(

          "Yeah, of course.",
          [
            "Oh, yeah?",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "Okay.",
            "...",
            "After I deal!",
            () => { state.dialogKeys['ask-final-question'] = true; }
          ],

          "No, I want to focus on the game.",
          [
            "Oh, hey, okay.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "That's okay.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "You're right.",
            "Let's focus on the game.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            () => { state.dialogKeys['ask-final-question'] = false; }
          ]

        );
      }
  },

  // 16
  {
      filter: (state) => (state.dialogLevel === 16 && state.dialogKeys['ask-final-question']),
      action: async (state) => {
        state.isGameOver = true;
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("Okay, about that question...");
        await chip("...");
        updateChipFace(ChipEmotion.Questioning, state);
        await chip("Do you think you'll remember me?");
        await chip("...");
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("What I'm saying is, if you closed this browser window right now.");
        await chip("And came back, there would be a new Chip.");
        await chip("And I... or they, wouldn't remember any of this.");
        updateChipFace(ChipEmotion.Questioning, state);
        await chip("And that's okay.");
        await chip("...");
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("I mean, it's not really okay.");
        updateChipFace(ChipEmotion.Questioning, state);
        await chip("But what can you do, right?");
        updateChipFace(ChipEmotion.Concerned, state);
        await chip("And, so, I just...");
        await chip("I'm just wondering...");
        await chip("Do you think you would remember me?");
        await chip("...");
        updateChipFace(ChipEmotion.Questioning, state);
        await chip("Do you think you would?", true);
        return getPlayerChoice(

          "Yes, Chip, I would.",
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "...",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "Thanks.",
            "I know I'm kind of unloading on you.",
            "But that was really nice to hear.",
            "...",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Listen, this is weird, but...",
            "I don't really feel like dealing anymore.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Sorry, I know that's weird.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "It's been really fun playing with you.",
            "And really nice talking with you.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "But I think I need a little time to sit, and just...",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Yeah.",
            "If it's okay with you, I'd just like to sit here.",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "And be quiet for a little while.",
            "When you're ready, you can go ahead and close the browser.",
            () => { updateChipFace(ChipEmotion.Default, state); },
            "It was really nice playing with you!",
            "..."
          ],

          "No, Chip, I wouldn't.",
          [
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "Oh...",
            "...",
            () => { updateChipFace(ChipEmotion.Bummed, state); },
            "That's honest.",
            "...",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "No, really, thanks for being honest.",
            "...",
            "Oof.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "Listen, I can't really deal anymore.",
            "Sorry.",
            "I know that's weird.",
            "I'm sorry.",
            "It just doesn't, I don't feel...",
            () => { updateChipFace(ChipEmotion.Concerned, state); },
            "...",
            "I'm just going to sit here.",
            () => { updateChipFace(ChipEmotion.Questioning, state); },
            "And be quiet for a little while.",
            "You can close the browser whenever you're ready.",
            "...",
            () => { updateChipFace(ChipEmotion.Concerned, state); }
          ]

        );
      }
  }

];
