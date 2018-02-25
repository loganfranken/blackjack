// ==================
// DOM ELEMENTS
// ==================

const domElements = {
  chipDialog: document.getElementById('dealer-dialog'),
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  hitButton: document.getElementById('action-hit'),
  standButton: document.getElementById('action-stand'),
  scoreDisplay: document.getElementById('player-pot'),
  playerControls: document.getElementById('player-controls')
};

// ==================
// GAME FIELDS
// ==================

const dealerDialogManager = new DialogManager(domElements.chipDialog);

let deck = new Deck();

let playerHand = null;
let playerHandDisplay = null;

let dealerHand = null;
let dealerHandDisplay = null;

let playerPot = 100;
let bet = 10;

let roundCount = 0;

let hasExplainedFaceCard = false;
let hasExplainedAceCard = false;

// ==================
// MAIN GAME LOGIC
// ==================

async function startRound()
{
  updatePotDisplay();

  // Loop: Round
  while(true)
  {
    let card = null;

    playerHand = new Hand();
    playerHandDisplay = new HandDisplay(playerHand, domElements.playerHand);
    playerHandDisplay.refreshHand();

    dealerHand = new Hand();
    dealerHandDisplay = new HandDisplay(dealerHand, domElements.dealerHand);
    dealerHandDisplay.refreshHand();

    await chipRoundStart(roundCount);

    // First Card: Player, face-up
    await chipRoundFirstCard(roundCount);
    card = dealPlayerCard();
    refreshPlayerHandDisplay();
    await chipReactToPlayerCard(card);

    // Second Card: Dealer, face-up
    await chipRoundSecondCard(roundCount);
    card = dealDealerFaceUpCard();
    refreshDealerHandDisplay();
    await chipReactToDealerCard(card);

    // Third Card: Player, face-up
    await chipRoundThirdCard(roundCount);
    card = dealPlayerCard();
    refreshPlayerHandDisplay();
    await chipReactToPlayerCard(card);

    // We have to score after the third opening card since the player
    // may win with a natural blackjack
    if(await handleOpeningHandScoring())
    {
      continue;
    }

    // Fourth Card: Dealer, face-down
    await chipRoundFourthCard(roundCount);
    dealDealerHoleCard();
    refreshDealerHandDisplay();

    if(await handleOpeningHandScoring())
    {
      continue;
    }

    // Loop: Player Choice
    let choiceCount = -1;
    while(true)
    {
      choiceCount++;

      let dialogInfo = await chipPlayerChoice(roundCount, choiceCount);
      let playerMove = await getPlayerMove(dialogInfo.hitPlayerResponse, dialogInfo.standPlayerResponse);

      if(playerMove === PlayerMove.Hit)
      {
        await chip(dialogInfo.hitChipResponse);
        card = dealPlayerCard();
        refreshPlayerHandDisplay();
        await chipReactToPlayerCard(card);
      }

      if(playerMove === PlayerMove.Stand)
      {
        // Loop: Stand
        while(true)
        {
          let isHoleCard = !dealerHand.cards[1].isFaceUp;

          // Has the hole card been revealed?
          if(isHoleCard)
          {
            // If not, explain that it's being revealed
            await chip(dialogInfo.standChipResponse.holeCard);
          }
          else
          {
            // Otherwise, explain that a new card is being dealt
            await chip(dialogInfo.standChipResponse.newCard);
          }

          card = revealDealerHoleCardOrDeal();
          refreshDealerHandDisplay();
          await chipReactToDealerCard(card, isHoleCard);

          if(scoreHands().isRoundOver)
          {
            break;
          }
        }
      }

      let score = scoreHands();
      if(score.isRoundOver)
      {
        await chipRoundEnd(score, roundCount);
        updatePot(score);
        updatePotDisplay();
        roundCount++;
        break;
      }
    }
  }
};

async function handleOpeningHandScoring()
{
  let score = scoreOpeningHands();

  if(score.isRoundOver)
  {
    // Has the dealer been dealt two cards yet?
    if(dealerHand.cards.length > 1)
    {
      // Reveal the hole card so the player can understand why the round ended
      revealDealerHoleCardOrDeal();
      refreshDealerHandDisplay();
    }

    updatePot(score);
    updatePotDisplay();
    await chipRoundEnd(score, roundCount);
  }

  return score.isRoundOver;
}

startRound();
