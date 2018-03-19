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

let hasExplainedFaceCard = false;
let hasExplainedAceCard = false;

let state = {

  roundCount: 0,

  dialogLevel: 0,
  hasExplainedPot: false,
  hasReactedToPlayerCard: false,
  hasReactedToHoleCard: false,
  hasExplainedFaceCard: false,
  hasExplainedAceCard: false,

  domElements: domElements,

  playerPot: 100,
  bet: 10

};

// ==================
// MAIN GAME LOGIC
// ==================

async function startRound()
{
  updatePotDisplay(state);

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

    await chipRoundStart(state.roundCount);

    // First Card: Player, face-up
    card = dealPlayerCard();
    refreshPlayerHandDisplay();
    await chipRoundFirstCard(state.roundCount);
    await chipReactToPlayerCard(card, state);

    // Second Card: Dealer, face-up
    card = dealDealerFaceUpCard();
    refreshDealerHandDisplay();
    await chipRoundSecondCard(state.roundCount);
    await chipReactToDealerCard(card, false, state);

    // Third Card: Player, face-up
    card = dealPlayerCard();
    refreshPlayerHandDisplay();
    await chipRoundThirdCard(state.roundCount);
    await chipReactToPlayerCard(card, state);

    // We have to score after the third opening card since the player
    // may win with a natural blackjack
    if(await handleOpeningHandScoring())
    {
      continue;
    }

    // Fourth Card: Dealer, face-down
    dealDealerHoleCard();
    refreshDealerHandDisplay();
    await chipRoundFourthCard(state.roundCount);

    if(await handleOpeningHandScoring())
    {
      continue;
    }

    // Loop: Player Choice
    let choiceCount = -1;
    while(true)
    {
      choiceCount++;

      let dialogInfo = await chipPlayerChoice(state.roundCount, choiceCount, state);
      let playerMove = await getPlayerMove(dialogInfo.hitPlayerResponse, dialogInfo.standPlayerResponse);

      if(playerMove === PlayerMove.Hit)
      {
        await chip(dialogInfo.hitChipResponse);
        card = dealPlayerCard();
        refreshPlayerHandDisplay();
        await chipReactToPlayerCard(card, state);
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
          await chipReactToDealerCard(card, isHoleCard, state);

          if(scoreHands().isRoundOver)
          {
            break;
          }
        }
      }

      let score = scoreHands();
      if(score.isRoundOver)
      {
        await handleRoundEnd(score, state);
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

    await handleRoundEnd(score, state);
  }

  return score.isRoundOver;
}

async function handleRoundEnd(score, state)
{
  await chipRoundEnd(score, state.roundCount);

  updatePot(score, state);
  updatePotDisplay(state);
  await chipExplainPot(score, state);

  state.roundCount++;
}

startRound();
