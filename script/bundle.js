!function(e){var a={};function t(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var i in e)t.d(n,i,function(a){return e[a]}.bind(null,i));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=0)}([function(e,a,t){"use strict";t.r(a);const n=e=>{let a=e.length;for(;0!==a;){const t=Math.floor(Math.random()*a),n=e[a-=1];e[a]=e[t],e[t]=n}},i=e=>new Promise((a,t)=>{setTimeout(()=>{a()},e)}),o=e=>{let a=!1,t="";for(let n=0;n<e.length;n++){const i=e[n];"*"===i?(t+=a?"</strong>":"<strong>",a=!a):t+=i}return t},r=(e,a)=>(e=Math.ceil(e),a=Math.floor(a),Math.floor(Math.random()*(a-e+1))+e),s=e=>e[Math.floor(Math.random()*e.length)];window.DialogManager=window.DialogManager||new class{constructor(e){this.currMessageIndex=0,this.domElement=null,this.isSkipping=!1,this.isTalking=!1,this.onFinished=null}setOutputTarget(e){this.domElement=e}async outputMessage(e,a){this.isTalking=!0,this.isFinished=!1;let t=0;const n=e.length;for(;this.isTalking;){if(this.isSkipping){this.domElement.innerHTML=o(e),this.isSkipping=!1,this.isTalking=!1;break}const a=e[t];this.domElement.innerHTML=o(e.slice(0,t+1)),t++;let r=30;"."!==a&&"?"!==a&&"!"!==a||(r=200),t<n?await i(r):this.isTalking=!1}a||await new Promise(e=>{this.onFinished=e})}advanceMessage(){this.isTalking?this.isSkipping||(this.isSkipping=!0):(null!=this.onFinished&&this.onFinished(),this.onFinished=null)}};var l=window.DialogManager;async function d(e,a){if(Array.isArray(e))for(let t=0;t<e.length;t++)await l.outputMessage(e[t],a);else await l.outputMessage(e,a)}var h=async function(e){if(2===e.dealerHand.cards.length){switch(r(0,1)){case 0:return void await d("Now I'll deal myself a card.");case 1:return void await d("Now I'll take another card.")}}switch(r(0,4)){case 0:return void await d("Another for me.");case 1:return void await d("One more for me.");case 2:return void await d("I'll take another.");case 3:return void await d("Another card coming my way.");case 4:return void await d("I'll keep going.")}},u={Default:0,Happy:1,Astonished:2};async function c(e){!e.hasExplainedPipStandLimit&&e.dealerHand.getPipTotal()>17&&(await d("Alright, my card total is past 17 so I'll stop dealing myself cards."),e.hasExplainedPipStandLimit=!0)}var y={DealerWins:0,PlayerWins:1,Tie:2},w=async function(e,a){e.roundEndState!==y.DealerWins||a.hasExplainedPot||(await d("If you lose all your coins, that's game over!"),a.hasExplainedPot=!0)},p=async function(e){e.playerPot<=0?(await d("Oh no! That's game over!"),await d("Better luck next time!")):e.playerPot>=999&&(await d("Oh, uhh, huh."),await d("This is awkward."),await d("But, umm..."),await d("We're out of money?"),await d("Yeah, you, umm, won all of the money?"),await d("Sorry."),await d("So that's it.")),await d("..."),await d("..."),await d("Oh, so I'll just stay here."),await d("But you can close the window or refresh to start a new game."),await d("..."),await d("...yeah."),await d("Alright, well, whenever you're ready."),await d("...")};async function m(e,a,t){t.dialogLevel++;for(let e=0;e<v.length;e++)if(v[e].filter(t)){let a=v[e];return v.splice(e,1),await a.action(t)}return await d("Hit or stand?",!0),g()}function g(){return{hitPlayerResponse:"*Hit*",standPlayerResponse:"*Stand*",hitChipResponse:f(s(["here's your card.","take a card.","a card for you.","here's a card."])),standChipResponse:f(s(["let's look at that hidden card.","I'll flip over my hidden card.","let's reveal the hidden card.","I'll show my card."]))}}function f(e){let a=s([null,"Alright","Okay","Sounds good"]);return a?a+", "+e:e[0].toUpperCase()+e.substring(1)}function k(e,a,t,n,i,o){return Math.round(Math.random())?{hitPlayerResponse:`${e} *Hit*`,standPlayerResponse:`${n} *Stand*`,hitChipResponse:a,standChipResponse:i,hitAction:t,standAction:o}:{hitPlayerResponse:`${n} *Hit*`,standPlayerResponse:`${e} *Stand*`,hitChipResponse:i,standChipResponse:a,hitAction:o,standAction:t}}const v=[{filter:e=>1===e.dialogLevel,action:async()=>(await d("Now you get to make a *choice*..."),await d("You can *hit* and take another card."),await d("Or you can *stand* and I'll start dealing myself cards until I reach *17*."),await d("Sooo, do you want to hit or stand? (*Choose below*)",!0),g())},{filter:e=>2===e.dialogLevel,action:async()=>(await d("Same choice again: hit or stand?",!0),g())},{filter:e=>3===e.dialogLevel,action:async()=>(await d("You know the drill: hit or stand?",!0),g())},{filter:e=>4===e.dialogLevel,action:async()=>(await d("Hit or stand?",!0),g())},{filter:e=>5===e.dialogLevel,action:async()=>(await d("How are you doing today?",!0),k("Pretty good!","That's great!",null,"Not so great.","Oh no, well hopefully this game will cheer you up.",null))},{filter:e=>6===e.dialogLevel,action:async()=>(await d("Are you feeling lucky today?",!0),k("Oh, totally!","Nice! That's the spirit!",e=>{e.dialogKeys.lucky=!0},"Oof, no, not at all.","Aww, come on. Not with that attitude!",e=>{e.dialogKeys["not-lucky"]=!0}))},{filter:e=>e.dialogKeys.lucky,action:async e=>{await d("What's got you feeling so lucky?",!0);let a=e.playerWinPercentage>50;return k("I've always been a lucky person.",a?"Dang, must be nice! Yeah, you've definitely had some good hands.":"Yeah? Well, I've got to say: I've had most of the luck so far!",null,"I'm just feeling lucky today.",a?"You must be! You've had some good hands!":["Oh... yeah?","But you haven't really...","Uhh, well, I'm excited for your comeback!"],null)}},{filter:e=>e.dialogKeys["not-lucky"],action:async e=>{await d("Why do you feel so unlucky?",!0);let a=e.playerWinPercentage>50;return k("I never win at anything.",a?"Really? You've had some good hands so far, though.":"You haven't had a great game so far, but maybe things will turn around?",null,"I'm just not feeling lucky today.",a?"Well, even if you're not feeling it, you've had some good hands.":"Yeah, you've had kind of a tough game, but maybe things will turn around!",null)}},{filter:e=>8===e.dialogLevel,action:async()=>(await d("Do you like blackjack?",!0),k("I love it.","Oh, great! Me too!",null,"Not really.","Oh... really?",null))},{filter:e=>9===e.dialogLevel,action:async()=>(await d("Have you played this game before?",!0),k("Nope, first time.",["Oh, really? I wouldn't know.","Your dealer changes each time you play."],e=>{e.dialogKeys["first-time"]=!0},"Oh yeah, remember?",["Oh, sorry, no, I don't remember.","That wasn't me.","Your dealer changes each time you play."],e=>{e.dialogKeys["return-player"]=!0}))},{filter:e=>e.dialogKeys["first-time"],action:async()=>(await d("Since it's your first time, do you think you'll play again?",!0),k("Oh yeah!",["Nice!","Well, next time...","Tell Chip I said hi!","...","Because we're all named Chip, is what I'm saying."],null,"No, I don't think so.",["Oof.","Oh, well.","Sorry I didn't make a better first impression.","Maybe you'll like the next Chip better."],null))},{filter:e=>e.dialogKeys["return-player"],action:async()=>(await d("What was your dealer's name last time?",!0),k("Chip, just like you.",["Oh, yeah? How weird!","...","Actually, I knew that.","We're all named Chip.","I was just kidding.","Sorry, that was weird I tricked you.","I thought it would be funny.","...","Anyway..."],null,"Harold.",["Uhh... what?","Oh, are you messing with me?","We're all named Chip."],null))},{filter:e=>11===e.dialogLevel&&e.playerWinPercentage>=50,action:async()=>(await d("Dang, you're doing really well."),await d("You're not some kind of card shark are you?",!0),k("What? Of course not!",["Oh! No, I'm just joking!","I wouldn't even know how to spot a card shark, honestly.","Whoa, please don't tell anyone that."],e=>{e.dialogKeys["card-shark"]=!0},"Oh, totally.",["...","Wait, what?","Seriously?","I was just joking.","You're messing with me, right?","I hope so.","I wouldn't even know how to spot a card shark, honestly.","Whoa, please don't tell anyone that."],e=>{e.dialogKeys["card-shark"]=!0}))},{filter:e=>11===e.dialogLevel&&e.playerWinPercentage<50,action:async()=>(await d("Oof, so it's kind of been a rough game for you, huh?"),await d("Well, at least you're not a card shark.",!0),k("Haha, right?",["Just kidding!","I wouldn't even know how to spot a card shark, honestly.","Whoa, please don't tell anyone that."],null,"...yeah, I guess not.",["Oh, uhh, geez! I'm sorry!","I was just joking.","I wouldn't even know how to spot a card shark, honestly.","Whoa, please don't tell anyone that."],null))},{filter:e=>12===e.dialogLevel,action:async()=>(await d("Hey, so, uhh, remember when I said I couldn't spot a card shark?"),await d("You're not going to tell anyone about that, right?",!0),k("Your secret's safe with me.","Phew, thanks.",null,"I'm telling everyone.",["Aww, come on.","Don't be like that!","Please, I've got a reputation here."],null))},{filter:e=>13===e.dialogLevel,action:async()=>(await d("Card sharks are super interesting, though."),await d("What do you think it takes to be a card shark?",!0),k("A good memory.",["Right?","It seems so hard to remember all of those cards."],null,"Sharp math skills.",["Yeah, you're probably right.","A good memory seems important too, though, right?"],null))},{filter:e=>14===e.dialogLevel,action:async e=>(await d("Memory is a weird thing, you know?"),await d("We rely on it for everything, but we forget *so much*!"),await d("I sometimes wonder if it's just a little box in there."),await d("And it can only hold so much."),await d("And if I remember something new, do I forget something else?"),await d("And what if I'm not trying to remember something and then there it goes?"),await d("*Poof!* There goes my favorite memory!"),await d("Replaced by a weird story someone told me about eating figs!"),await d("..."),await d("Oh, whoa, sorry."),await d("I just started rambling there."),await d("Well, enough, about me: what about your memory?"),await d("I mean, can you even remember how many rounds we've played so far?",!0),k(`Uhh, ${e.roundCount+1}.`,["That's right!","Wow, you have a good memory!"],null,`Uhh, ${e.roundCount+2}.`,["Ahh, sorry, that's wrong","But, hey, at least you're saving that room for something else."],null))},{filter:e=>15===e.dialogLevel,action:async()=>(await d("...",!0),await d("Hey, listen, can I ask you something?",!0),k("Yeah, of course.",["Oh, yeah?","Okay.","...","After this round!"],e=>{e.dialogKeys["ask-final-question"]=!0},"No, I want to focus on the game.",["Oh, hey, okay.","That's okay.","You're right.","Let's focus on the game."],e=>{e.dialogKeys["ask-final-question"]=!1}))},{filter:e=>16===e.dialogLevel&&e.dialogKeys["ask-final-question"],action:async e=>(e.isGameOver=!0,await d("Okay, about that question..."),await d("..."),await d("Do you think you'll remember me?"),await d("..."),await d("What I'm saying is, if you closed this browser window right now."),await d("And came back, there would be a new me. A new Chip."),await d("I... or they, wouldn't remember any of this."),await d("And that's okay."),await d("..."),await d("I mean, it's not really okay. But, it's how it is."),await d("And, so, I just..."),await d("I'm just wondering..."),await d("Would you remember me? This Chip. This me."),await d("..."),await d("Do you think you would?",!0),k("Yes, Chip, I would.",["Thank you, I, I needed to hear that.","Listen, I can't deal anymore.","It's just...","I can't.","If it's okay with you, I'd just like to sit here.","And be quiet for a little while.","And, when you're done, you can go ahead and close the browser.","It was nice playing with you","..."],null,"No, Chip, I wouldn't.",["Oh...","...","That's honest.","...","No, I, I needed to hear that.","...","Listen, I can't really play anymore.","It just doesn't, I don't feel..","I just can't","I'm just going to sit here.","And be quiet for a little while.","You can close the browser whenever you're ready.","..."],null))}];var b=function(e,a){var t=a.domElements.dealerPicture;switch(e){case u.Default:t.className="default";break;case u.Happy:t.className="happy";break;case u.Astonished:t.className="astonished"}};async function I(e){e.hasExplainedFaceCard||(b(u.Astonished,e),await d("Raise your trumpets! Here comes royalty!"),b(u.Default,e),await d("..."),await d("The first face card, I mean."),await d("Anyway..."),await d("Face cards are worth ten points."),e.hasExplainedFaceCard=!0)}async function C(e){e.hasExplainedAceCard||(await d("Ooh, spicy: an ace!"),await d("The ace is tricky: it's worth 11 unless it would push your score over 21."),await d("Then it's only worth one point."),e.hasExplainedAceCard=!0)}var E=e=>{switch(e){case"A":return"an ace";case"2":return"a two";case"3":return"a three";case"4":return"a four";case"5":return"a five";case"6":return"a six";case"7":return"a seven";case"8":return"an eight";case"9":return"a nine";case"10":return"a ten";case"J":return"a jack";case"Q":return"a queen";case"K":return"a king"}};async function H(e,a,t){a?t.hasReactedToHoleCard||(await d(`I had ${E(e.rank)}.`),t.hasReactedToHoleCard=!0):t.hasReactedToDealerCard||(await d(`I got ${E(e.rank)}.`),t.hasReactedToDealerCard=!0),e.isFaceCard()&&await I(t),e.isAce()&&await C(t)}async function P(e,a){a.hasReactedToPlayerCard||(await d(`You got ${E(e.rank)}.`),a.hasReactedToPlayerCard=!0),e.isFaceCard()&&await I(a),e.isAce()&&await C(a)}var T=0,O=1,A=2,W=3,D=async function(e,a){let t="";switch(e.roundEndState){case y.DealerWins:switch(e.roundEndCondition){case T:t="*Hot dog!* I started off with a blackjack. *I win!*";break;case O:t="I got 21. That's blackjack! *I win!*";break;case A:t="You went over 21 and busted. *I win!*";break;case W:t="Phew! I made it over 17 with the highest score. *I win!*"}break;case y.PlayerWins:switch(e.roundEndCondition){case T:t="*Lucky!* You started off with a blackjack. *You win!*";break;case O:t="You got 21. That's blackjack! *You win!*";break;case A:t="Ahh, I went over 21 and busted. *You win!*";break;case W:t="You have the higher score! *You win!*"}break;case y.Tie:switch(t="It's a *tie!*",e.roundEndCondition){case T:t="We both have natural blackjacks! *It's a tie!*"}}await d(t);let n="";if(0===a.roundCount){switch(e.roundEndState){case y.DealerWins:n=`Since I win, you lose the current bet, which is *${a.bet} coins*.`;break;case y.PlayerWins:n=`Since you win, you get the current bet, which is *${a.bet} coins*.`;break;case y.Tie:n=`Since we tied, no one wins the bet, which is *${a.bet} coins*.`}(e=>{e.domElements.betDisplay.className="active"})(a),await d(n)}};async function S(e){0===e?await d("First, I'll deal you a card."):await d("Here's your card.")}async function L(e){0===e?(await d("And one more for me, but this one face down!"),await d("I get to take a little peek, but not you."),await d("If I'm real lucky and start off with a blackjack, then that's a win for me!")):await d("And another for me.")}async function R(e){0===e?await d("Next, I'll deal myself a card."):await d("And here's my card.")}async function j(e){0===e?(await d("Hiya! My name's *Chip*! Let's play some *Blackjack*! (Press *Enter* or *click* anywhere)"),await d("It's easy: just try and get a *higher score* than me."),await d("But *don't go over 21*!")):await d("Next round!")}async function M(e){0===e?await d("And now I'll deal you another card."):await d("And another for you.")}async function F(e){e.dialogLevel>5&&(6===e.dialogLevel||e.roundCount%3==0)&&e.bet<100&&(e.bet+=10,await d(`Let's raise the stakes! I'll increase the bet to *${e.bet}*.`))}var Y=e=>{let a=e.shoe.dealFaceUpCard();return e.dealerHand.takeCard(a),a},x=e=>{let a=e.shoe.dealFaceDownCard();return e.dealerHand.takeCard(a),a},N=e=>{let a=e.shoe.dealFaceUpCard();return e.playerHand.takeCard(a),a},B=e=>{e.domElements.playerControls.className="",e.domElements.playerControlButtons.forEach(e=>e.blur())},K={Hit:0,Stand:1},U=(e,a,t)=>{const n=t.domElements.hitButton,i=t.domElements.standButton;return n.innerHTML=o(e),i.innerHTML=o(a),new Promise((e,a)=>{const o=a=>{a.stopPropagation(),n.removeEventListener("click",o),i.removeEventListener("click",r),B(t),e(K.Hit)},r=a=>{a.stopPropagation(),n.removeEventListener("click",o),i.removeEventListener("click",r),B(t),e(K.Stand)};n.addEventListener("click",o),i.addEventListener("click",r),(e=>{e.domElements.playerControls.className="active"})(t)})},$=class{constructor(){this.cards=[]}takeCard(e){this.cards.push(e)}getPipTotal(e){let a=0,t=0;if(this.cards.forEach(n=>{if(e||n.isFaceUp)switch(n.rank){case"A":t++;break;case"2":a+=2;break;case"3":a+=3;break;case"4":a+=4;break;case"5":a+=5;break;case"6":a+=6;break;case"7":a+=7;break;case"8":a+=8;break;case"9":a+=9;break;case"10":case"J":case"Q":case"K":a+=10}}),t>0){let e=11*t;for(;a+e>21&&e!=t;)e-=10;a+=e}return a}},q=class{constructor(e,a){this.domElement=a,this.hand=e,this.listElement=this.domElement.querySelector("ul"),this.pipTotalElement=this.domElement.querySelector(".pip-total"),this.pipTotalElement.className="pip-total"}refreshHand(){for(this.domElement.classList.contains("hidden")&&this.domElement.classList.remove("hidden");this.listElement.firstChild;)this.listElement.removeChild(this.listElement.firstChild);let e=this.hand.cards.length-1;this.hand.cards.forEach((a,t)=>{const n=document.createElement("li"),i=a.isFaceUp;n.classList=`card ${i?a.suit.toLowerCase():"facedown"}`,t===e&&(n.classList+=" new"),i&&n.setAttribute("data-rank",a.rank),this.listElement.appendChild(n)});const a=this.hand.getPipTotal();this.pipTotalElement.innerHTML=a,a>0&&"pip-total"===this.pipTotalElement.className&&(this.pipTotalElement.className+=" active")}hideHand(){this.domElement.classList.add("hidden"),this.pipTotalElement.innerHTML="0"}},G=e=>{let a;return a=e.dealerHand.cards[1].isFaceUp?Y(e):(e=>(e.dealerHand.cards[1].isFaceUp=!0,e.dealerHand.cards[1]))(e)},_=e=>21===e.playerHand.getPipTotal()?{isRoundOver:!0,roundEndState:y.PlayerWins,roundEndCondition:O}:e.playerHand.getPipTotal()>21?{isRoundOver:!0,roundEndState:y.DealerWins,roundEndCondition:A}:21===e.dealerHand.getPipTotal()?{isRoundOver:!0,roundEndState:y.DealerWins,roundEndCondition:O}:e.dealerHand.getPipTotal()>21?{isRoundOver:!0,roundEndState:y.PlayerWins,roundEndCondition:A}:e.dealerHand.getPipTotal()>17?e.dealerHand.getPipTotal()>e.playerHand.getPipTotal()?{isRoundOver:!0,roundEndState:y.DealerWins,roundEndCondition:W}:e.playerHand.getPipTotal()>e.dealerHand.getPipTotal()?{isRoundOver:!0,roundEndState:y.PlayerWins,roundEndCondition:W}:{isRoundOver:!0,roundEndState:y.Tie}:{isRoundOver:!1},J=e=>{let a=e.dealerHand.getPipTotal(!0),t=e.playerHand.getPipTotal();return 21===a?21===t?{isRoundOver:!0,roundEndState:y.Tie,roundEndCondition:T}:{isRoundOver:!0,roundEndState:y.DealerWins,roundEndCondition:T}:21===t?{isRoundOver:!0,roundEndState:y.PlayerWins,roundEndCondition:T}:{isRoundOver:!1}},z=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],Q=["Clubs","Diamonds","Hearts","Spades"],V=class{constructor(){this.cards=[],Q.forEach(e=>{z.forEach(a=>{this.cards.push(new class{constructor(e,a,t){this.suit=e,this.rank=a,this.isFaceUp=t}isFaceCard(){return"J"===this.rank||"Q"===this.rank||"K"===this.rank}isAce(){return"A"===this.rank}isNumber(){return!this.isAce()&&!this.isFaceCard()}}(e,a,!1))})}),n(this.cards)}};function X(e,a,t){let n=[],i=0;for(;n.length<a;){let a=e[i];null!=a&&t(a)&&(n.push(a),e[i]=null),i++}return n}var Z=e=>{e.domElements.betDisplay.innerHTML=e.bet},ee=async function(e,a){e.roundEndState===y.DealerWins&&b(u.Happy,a)},ae=async function(e){b(u.Default,e)},te=(e,a)=>{a.previousPlayerPot=a.playerPot,e.roundEndState===y.DealerWins&&(a.playerPot-=a.bet),e.roundEndState===y.PlayerWins&&(a.playerPot+=a.bet)},ne=e=>{let a=e.domElements.scoreDisplay,t=e.domElements.scoreDisplay.parentElement,n=e.playerPot;e.playerPot>999?n="999":e.playerPot<0?n='<span class="leading-zero">000</span>':e.playerPot<100?n=`<span class="leading-zero">0</span>${e.playerPot}`:e.playerPot<10&&(n=`<span class="leading-zero">00</span>${e.playerPot}`),a.innerHTML=n,e.playerPot<e.previousPlayerPot&&(t.classList+=" decrease"),e.playerPot>e.previousPlayerPot&&(t.classList+=" increase"),setTimeout(()=>{t.classList="player-pot-display"},500)};const ie={chipDialog:document.getElementById("dealer-dialog"),playerHand:document.getElementById("player-hand"),dealerHand:document.getElementById("dealer-hand"),hitButton:document.getElementById("action-hit"),standButton:document.getElementById("action-stand"),scoreDisplay:document.getElementById("player-pot"),betDisplay:document.getElementById("bet-display"),playerControls:document.getElementById("player-controls"),dealerPicture:document.getElementById("dealer-picture")};ie.playerControlButtons=ie.playerControls.querySelectorAll("button");let oe={roundCount:0,dealerWinCount:0,playerWinCount:0,dealerWinPercentage:0,playerWinPercentage:0,dialogLevel:0,dialogKeys:[],hasExplainedPot:!1,hasReactedToPlayerCard:!1,hasReactedToHoleCard:!1,hasExplainedFaceCard:!1,hasExplainedAceCard:!1,domElements:ie,playerPot:50,bet:10,shoe:new class{constructor(e){this.deckCount=e,this.reset()}dealFaceUpCard(){const e=this.cards.shift();return e.isFaceUp=!0,e}dealFaceDownCard(){const e=this.cards.shift();return e.isFaceUp=!1,e}needsReset(){return this.cards.length<this.splitCount}reset(){this.cards=[];for(let e=0;e<this.deckCount;e++){let e=new V;this.cards.push(...e.cards)}n(this.cards),this.splitCount=r(20,this.cards.length-1)}}(3),playerHand:null,playerHandDisplay:null,dealerHand:null,dealerHandDisplay:null,hasExplainedFaceCard:!1,hasExplainedAceCard:!1,hasExplainedPipStandLimit:!1,isGameOver:!1};async function re(e){let a=J(e);return a.isRoundOver&&(e.dealerHand.cards.length>1&&(G(e),e.dealerHandDisplay.refreshHand()),await se(a,e)),a.isRoundOver}async function se(e,a){ee(e,a),await D(e,a),te(e,a),ne(a),await w(e,a),a.roundCount++,e.roundEndState===y.DealerWins&&a.dealerWinCount++,e.roundEndState===y.PlayerWins&&a.playerWinCount++,a.dealerWinPercentage=a.dealerWinCount/a.roundCount*100,a.playerWinPercentage=a.playerWinCount/a.roundCount*100}oe.shoe.cards=function(e){let a=e.slice(),t=[];t.push(...X(a,8,e=>e.isNumber())),t.push(...X(a,1,e=>e.isFaceCard())),t.push(...X(a,4,e=>e.isNumber())),t.push(...X(a,1,e=>e.isAce()));for(var n=0;n<a.length;n++)null!=a[n]&&t.push(a[n]);return t}(oe.shoe.cards),l.setOutputTarget(ie.chipDialog),document.addEventListener("keydown",e=>{13===e.keyCode&&l.advanceMessage()}),document.addEventListener("click",()=>{l.advanceMessage()}),async function(){for(ne(oe);ae(oe),!oe.isGameOver;){if(oe.playerPot<=0||oe.playerPot>=999){await p(oe);break}await F(oe),Z(oe),oe.playerHandDisplay&&oe.playerHandDisplay.hideHand(),oe.dealerHandDisplay&&oe.dealerHandDisplay.hideHand();let e=null;if(oe.shoe.needsReset()&&oe.shoe.reset(),await j(oe.roundCount),oe.playerHand=new $,oe.playerHandDisplay=new q(oe.playerHand,ie.playerHand),oe.playerHandDisplay.refreshHand(),oe.dealerHand=new $,oe.dealerHandDisplay=new q(oe.dealerHand,ie.dealerHand),oe.dealerHandDisplay.refreshHand(),e=N(oe),oe.playerHandDisplay.refreshHand(),await S(oe.roundCount),await P(e,oe),e=Y(oe),oe.dealerHandDisplay.refreshHand(),await R(oe.roundCount),await H(e,!1,oe),e=N(oe),oe.playerHandDisplay.refreshHand(),await M(oe.roundCount),await P(e,oe),await re(oe))continue;if(x(oe),oe.dealerHandDisplay.refreshHand(),await L(oe.roundCount),await re(oe))continue;let a=-1;for(;;){a++;let t=await m(oe.roundCount,0,oe),n=await U(t.hitPlayerResponse,t.standPlayerResponse,oe);if(n===K.Hit){if(await d(t.hitChipResponse),t.hitAction&&t.hitAction(oe),oe.isGameOver)break;e=N(oe),oe.playerHandDisplay.refreshHand(),await P(e,oe)}if(n===K.Stand){t.standAction&&t.standAction(oe);let a=!0;for(;;){let n=!oe.dealerHand.cards[1].isFaceUp;if(a){if(await d(t.standChipResponse),a=!1,oe.isGameOver)break}else await h(oe);if(e=G(oe),oe.dealerHandDisplay.refreshHand(),await H(e,n,oe),await c(oe),_(oe).isRoundOver)break}if(oe.isGameOver)break}let i=_(oe);if(i.isRoundOver){await se(i,oe);break}}if(oe.isGameOver)break}}()}]);