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

    // Fourth Card: Dealer, face-down
    await chipRoundFourthCard(roundCount);
    dealDealerHoleCard();
    refreshDealerHandDisplay();

    let score = scoreOpeningHands();
    if(score.isRoundOver)
    {
      updatePot(score);
      updatePotDisplay();
      await chipRoundEnd(score, roundCount);
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
          await chip(dialogInfo.standChipResponse);
          card = revealDealerHoleCardOrDeal();
          refreshDealerHandDisplay();
          await chipReactToDealerCard(card);

          if(scoreHands().isRoundOver)
          {
            break;
          }
        }
      }

      let score = scoreHands();
      if(score.isRoundOver)
      {
        updatePot(score);
        updatePotDisplay();
        await chipRoundEnd(score, roundCount);
        roundCount++;
        break;
      }
    }
  }
};

startRound();
