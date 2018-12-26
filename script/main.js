import chip from './actions/chip';
import chipAnnounceNewStandCard from './actions/chipAnnounceNewStandCard';
import ChipEmotion from './ChipEmotion';
import chipExplainPipStandLimit from './actions/chipExplainPipStandLimit';
import chipExplainPot from './actions/chipExplainPot';
import chipGameOver from './actions/chipGameOver';
import chipPlayerChoice from './actions/chipPlayerChoice';
import chipReactToDealerCard from './actions/chipReactToDealerCard';
import chipReactToPlayerCard from './actions/chipReactToPlayerCard';
import chipRoundEnd from './actions/chipRoundEnd';
import chipRoundFirstCard from './actions/chipRoundFirstCard';
import chipRoundFourthCard from './actions/chipRoundFourthCard';
import chipRoundSecondCard from './actions/chipRoundSecondCard';
import chipRoundStart from './actions/chipRoundStart';
import chipRoundThirdCard from './actions/chipRoundThirdCard';
import chipUpdateBet from './actions/chipUpdateBet';
import dealDealerFaceUpCard from './actions/dealDealerFaceUpCard';
import dealDealerHoleCard from './actions/dealDealerHoleCard';
import dealPlayerCard from './actions/dealPlayerCard';
import DialogManager from './DialogManager';
import getPlayerMove from './actions/getPlayerMove';
import Hand from './Hand';
import HandDisplay from './HandDisplay';
import PlayerMove from './PlayerMove';
import revealDealerHoleCardOrDeal from './actions/revealDealerHoleCardOrDeal';
import RoundEndState from './RoundEndState';
import scoreHands from './actions/scoreHands';
import scoreOpeningHands from './actions/scoreOpeningHands';
import Shoe from './Shoe';
import sortCardsForTutorial from './actions/sortCardsForTutorial';
import updateBetDisplay from './actions/updateBetDisplay';
import updateChipFace from './actions/updateChipFace';
import updatePot from './actions/updatePot';
import updatePotDisplay from './actions/updatePotDisplay';

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
  betDisplay: document.getElementById('bet-display'),
  playerControls: document.getElementById('player-controls'),
  dealerPicture: document.getElementById('dealer-picture')
};

domElements.playerControlButtons = domElements.playerControls.querySelectorAll('button');

// ==================
// STATE
// ==================

let state = {

  roundCount: 0,

  dealerWinCount: 0,
  playerWinCount: 0,
  dealerWinPercentage: 0,
  playerWinPercentage: 0,

  dialogLevel: 0,
  dialogKeys: [],
  hasExplainedPot: false,
  hasReactedToPlayerCard: false,
  hasReactedToHoleCard: false,
  hasExplainedFaceCard: false,
  hasExplainedAceCard: false,

  domElements: domElements,

  playerPot: 50,
  bet: 10,

  shoe: new Shoe(3),

  playerHand: null,
  playerHandDisplay: null,

  dealerHand: null,
  dealerHandDisplay: null,

  hasExplainedFaceCard: false,
  hasExplainedAceCard: false,
  hasExplainedPipStandLimit: false,

  isGameOver: false

};

state.shoe.cards = sortCardsForTutorial(state.shoe.cards);

// ==================
// MAIN GAME LOGIC
// ==================

DialogManager.setOutputTarget(domElements.chipDialog);
setUpDialogControls();

async function startRound()
{
  updatePotDisplay(state);

  // Loop: Round
  while(true)
  {
    updateChipFace(ChipEmotion.Default, state);

    if(state.isGameOver)
    {
      break;
    }

    if(state.playerPot <= 0 || state.playerPot >= 999)
    {
      await chipGameOver(state);
      break;
    }

    // Update bet
    await chipUpdateBet(state);
    updateBetDisplay(state);

    state.playerHandDisplay && state.playerHandDisplay.hideHand();
    state.dealerHandDisplay && state.dealerHandDisplay.hideHand();

    let card = null;

    // Have we passed where the shoe was split? If so, reset
    if(state.shoe.needsReset())
    {
      state.shoe.reset();
    }

    // Have Chip start the round before we refresh the hands
    // to give a little time for the cards from the previous hand
    // to disappear
    await chipRoundStart(state.roundCount);

    state.playerHand = new Hand();
    state.playerHandDisplay = new HandDisplay(state.playerHand, domElements.playerHand);
    state.playerHandDisplay.refreshHand();

    state.dealerHand = new Hand();
    state.dealerHandDisplay = new HandDisplay(state.dealerHand, domElements.dealerHand);
    state.dealerHandDisplay.refreshHand();

    // First Card: Player, face-up
    card = dealPlayerCard(state);
    state.playerHandDisplay.refreshHand();
    await chipRoundFirstCard(state.roundCount);
    await chipReactToPlayerCard(card, state);

    // Second Card: Dealer, face-up
    card = dealDealerFaceUpCard(state);
    state.dealerHandDisplay.refreshHand();
    await chipRoundSecondCard(state.roundCount);
    await chipReactToDealerCard(card, false, state);

    // Third Card: Player, face-up
    card = dealPlayerCard(state);
    state.playerHandDisplay.refreshHand();
    await chipRoundThirdCard(state.roundCount);
    await chipReactToPlayerCard(card, state);

    // We have to score after the third opening card since the player
    // may win with a natural blackjack
    if(await handleOpeningHandScoring(state))
    {
      continue;
    }

    // Fourth Card: Dealer, face-down
    dealDealerHoleCard(state);
    state.dealerHandDisplay.refreshHand();
    await chipRoundFourthCard(state.roundCount);

    if(await handleOpeningHandScoring(state))
    {
      continue;
    }

    // Loop: Player Choice
    let choiceCount = -1;
    while(true)
    {
      choiceCount++;

      let dialogInfo = await chipPlayerChoice(state.roundCount, choiceCount, state);
      let playerMove = await getPlayerMove(dialogInfo.hitPlayerResponse, dialogInfo.standPlayerResponse, state);

      if(playerMove === PlayerMove.Hit)
      {
        if(dialogInfo.hitAction)
        {
          dialogInfo.hitAction(state);
        }

        await chip(dialogInfo.hitChipResponse);

        if(state.isGameOver)
        {
          break;
        }

        card = dealPlayerCard(state);
        state.playerHandDisplay.refreshHand();
        await chipReactToPlayerCard(card, state);
      }

      if(playerMove === PlayerMove.Stand)
      {
        if(dialogInfo.standAction)
        {
          dialogInfo.standAction(state);
        }

        // Loop: Stand
        let isFirstStand = true;
        while(true)
        {
          let isHoleCard = !state.dealerHand.cards[1].isFaceUp;

          if(isFirstStand)
          {
            await chip(dialogInfo.standChipResponse);
            isFirstStand = false;

            if(state.isGameOver)
            {
              break;
            }
          }
          else
          {
            await chipAnnounceNewStandCard(state);
          }

          card = revealDealerHoleCardOrDeal(state);
          state.dealerHandDisplay.refreshHand();
          await chipReactToDealerCard(card, isHoleCard, state);
          await chipExplainPipStandLimit(state);

          if(scoreHands(state).isRoundOver)
          {
            break;
          }
        }

        if(state.isGameOver)
        {
          break;
        }
      }

      let score = scoreHands(state);
      if(score.isRoundOver)
      {
        await handleRoundEnd(score, state);
        break;
      }
    }

    if(state.isGameOver)
    {
      break;
    }
  }
};

async function handleOpeningHandScoring(state)
{
  let score = scoreOpeningHands(state);

  if(score.isRoundOver)
  {
    // Has the dealer been dealt two cards yet?
    if(state.dealerHand.cards.length > 1)
    {
      // Reveal the hole card so the player can understand why the round ended
      revealDealerHoleCardOrDeal(state);
      state.dealerHandDisplay.refreshHand();
    }

    await handleRoundEnd(score, state);
  }

  return score.isRoundOver;
}

async function handleRoundEnd(score, state)
{
  await chipRoundEnd(score, state);

  updatePot(score, state);
  updatePotDisplay(state);
  await chipExplainPot(score, state);

  state.roundCount++;

  if(score.roundEndState === RoundEndState.DealerWins)
  {
    state.dealerWinCount++;
  }

  if(score.roundEndState === RoundEndState.PlayerWins)
  {
    state.playerWinCount++;
  }

  state.dealerWinPercentage = (state.dealerWinCount/state.roundCount) * 100;
  state.playerWinPercentage = (state.playerWinCount/state.roundCount) * 100;
}

function setUpDialogControls()
{
  // Enter
  document.addEventListener('keydown', (event) => {
    if(event.keyCode === 13)
    {
      DialogManager.advanceMessage();
    }
  });

  // Click
  document.addEventListener('click', () => {
    DialogManager.advanceMessage();
  });
}

startRound();
