!function(e){var a={};function t(n){if(a[n])return a[n].exports;var o=a[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var o in e)t.d(n,o,function(a){return e[a]}.bind(null,o));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=0)}([function(e,a,t){"use strict";t.r(a);const n=e=>{let a=e.length;for(;0!==a;){const t=Math.floor(Math.random()*a),n=e[a-=1];e[a]=e[t],e[t]=n}},o=e=>new Promise((a,t)=>{setTimeout(()=>{a()},e)}),i=e=>{let a=!1,t="";for(let n=0;n<e.length;n++){const o=e[n];"*"===o?(t+=a?"</strong>":"<strong>",a=!a):t+=o}return t},r=(e,a)=>(e=Math.ceil(e),a=Math.floor(a),Math.floor(Math.random()*(a-e+1))+e),s=e=>e[Math.floor(Math.random()*e.length)];window.DialogManager=window.DialogManager||new class{constructor(e){this.currMessageIndex=0,this.domElement=null,this.isSkipping=!1,this.isTalking=!1,this.onFinished=null;const a=this;document.addEventListener("keydown",e=>{13===e.keyCode&&a.advanceMessage()})}setOutputTarget(e){this.domElement=e}async outputMessage(e,a){this.isTalking=!0,this.isFinished=!1;let t=0;const n=e.length;for(;this.isTalking;){if(this.isSkipping){this.domElement.innerHTML=i(e),this.isSkipping=!1,this.isTalking=!1;break}const a=e[t];this.domElement.innerHTML=i(e.slice(0,t+1)),t++;let r=30;"."!==a&&"?"!==a&&"!"!==a||(r=200),t<n?await o(r):this.isTalking=!1}a||await new Promise(e=>{this.onFinished=e})}advanceMessage(){this.isTalking?this.isSkipping||(this.isSkipping=!0):(null!=this.onFinished&&this.onFinished(),this.onFinished=null)}};var l=window.DialogManager;async function d(e,a){await l.outputMessage(e,a)}var c=async function(){switch(r(0,4)){case 0:return void await d("Another for me.");case 1:return void await d("One more for me.");case 2:return void await d("I'll take another.");case 3:return void await d("Another card coming my way.");case 4:return void await d("I'll keep going.")}},u=0,h=1,y=2,p=async function(e,a){e.roundEndState!==u||a.hasExplainedPot||(await d("If you lose all your coins, that's game over!"),a.hasExplainedPot=!0)},w=async function(e,a){await d("Oh no! That's game over!")};async function g(e,a,t){t.dialogLevel++;for(let e=0;e<v.length;e++)if(v[e].filter(t)){let a=v[e];return v.splice(e,1),await a.action()}return await d("Hit or stand?",!0),f()}function f(){return{hitPlayerResponse:"*Hit*",standPlayerResponse:"*Stand*",hitChipResponse:m(s(["here's your card.","take a card.","a card for you.","here's a card."])),standChipResponse:m(s(["let's look at that hidden card.","I'll flip over my hidden card.","let's reveal the hidden card.","I'll show my card."]))}}function m(e){let a=s([null,"Alright","Okay","Sounds good"]);return a?a+", "+e:e[0].toUpperCase()+e.substring(1)}function k(e,a,t,n,o,i){return Math.round(Math.random())?{hitPlayerResponse:`${e} *Hit*`,standPlayerResponse:`${n} *Stand*`,hitChipResponse:`${a}`,standChipResponse:`${o}`,hitAction:t,standAction:i}:{hitPlayerResponse:`${n} *Hit*`,standPlayerResponse:`${e} *Stand*`,hitChipResponse:`${o}`,standChipResponse:`${a}`,hitAction:i,standAction:t}}const v=[{filter:e=>1===e.dialogLevel,action:async()=>(await d("Now you get to make a *choice*..."),await d("You can *hit* and take another card."),await d("Or you can *stand* and I'll start dealing myself cards until I reach *17*."),await d("Sooo, do you want to hit or stand?",!0),f())},{filter:e=>2===e.dialogLevel,action:async()=>(await d("Same choice again: hit or stand?",!0),f())},{filter:e=>3===e.dialogLevel,action:async()=>(await d("You know the drill: hit or stand?",!0),f())},{filter:e=>4===e.dialogLevel,action:async()=>(await d("Hit or stand?",!0),f())},{filter:e=>5===e.dialogLevel,action:async()=>(await d("How are you doing today?",!0),k("Pretty good!","That's great!",e=>{e.dialogKeys["good-day"]=!0},"Not so great.","Oh no, sorry to hear that.",e=>{e.dialogKeys["bad-day"]=!0}))},{filter:e=>e.dialogKeys["good-day"],action:async()=>(await d("Any reason you're in such a good mood?",!0),k("Yes, it's a big day for me!","Oh, wow!",null,"Nope, just feeling good!","How nice!",null))},{filter:e=>e.dialogKeys["bad-day"],action:async()=>(await d("What's bringing you down today?",!0),k("I just woke up feeling terrible.","Ouch, hopefully you'll feel better.",null,"I don't really want to talk about it.","Oh. I totally understand. Sorry.",null))},{filter:e=>7===e.dialogLevel,action:async()=>(await d("Do you think I'm good at this?",!0),k("Yeah, you're great!","Really? Thanks!",e=>{e.mood++},"Honestly, not really.","Oh. Well. That's honest.",e=>{e.mood--}))},{filter:e=>e.mood>0,action:async()=>(await d("You're really nice, you know?",!0),k("Aww, thanks!","No, thank *you*!",null,"Oh, no, I can be a real jerk.","What? I don't see that at all.",null))},{filter:e=>7===e.dialogLevel,action:async()=>(await d("Have you been playing blackjack long?",!0),k("Oh yeah, I'm an expert.","Dang, I knew it!",null,"Nah, just getting started.","Oh, great! Welcome to the game!",null))},{filter:e=>8===e.dialogLevel,action:async()=>(await d("Nice weather this afternoon, right?",!0),k("Oh yeah, I've been loving the sun.","I just love a little sun on my plastic!",null,"You think so? It's so dreary and overcast.","Oh. Yeah. Well, the cool weather is better for my plastic.",null))},{filter:e=>9===e.dialogLevel,action:async()=>(await d("What are you going to do with your winnings?",!0),k("Put them right in the bank.","Wow, so practical!",null,"Blow them on something fun.","Well, you only live once.",null))},{filter:e=>10===e.dialogLevel,action:async()=>(await d("Are you feeling lucky today?",!0),k("Oh yeah!","That's the spirit!",null,"No way.","Not with that attitude!",null))},{filter:e=>11===e.dialogLevel,action:async()=>(await d("Do you think it's usually better to hit or stand?",!0),k("Better to stand.","Better safe than sorry, right?",null,"Always hit!","Got to take the risk!",null))},{filter:e=>12===e.dialogLevel,action:async()=>(await d("Do you believe in fate?",!0),k("Yes, I think we are all on a predetermined path.","Wow, I wonder what's in store for the both of us.",null,"No, our actions determine our path in life.","How exciting!",null))},{filter:e=>13===e.dialogLevel,action:async()=>(await d("Do you think you'll win this round?",!0),k("Yes, I'm sure of it.","How confident!",null,"No, probably not.","You gotta have hope!",null))},{filter:e=>14===e.dialogLevel,action:async()=>(await d("Would you want to know how you would die?",!0),k("Yeah, it would be better to just know.","It's true, it would no longer be a question.",null,"No, I wouldn't want that always on my mind.","Yeah, it could really wear on you.",null))},{filter:e=>15===e.dialogLevel,action:async()=>(await d("Are you responsible for your own actions?",!0),k("Yes, I have shaped my life.","What about the things out of your control?",null,"No, external forces have shaped my life.","What about the things in your control?",null))}];async function E(e){e.hasExplainedFaceCard||(await d("Face cards are worth ten points."),e.hasExplainedFaceCard=!0)}async function H(e){e.hasExplainedAceCard||(await d("An ace is worth 11 unless it would push your score over 21."),await d("Then it's worth only one point."),e.hasExplainedAceCard=!0)}var b=e=>{switch(e){case"A":return"an ace";case"2":return"a two";case"3":return"a three";case"4":return"a four";case"5":return"a five";case"6":return"a six";case"7":return"a seven";case"8":return"an eight";case"9":return"a nine";case"10":return"a ten";case"J":return"a jack";case"Q":return"a queen";case"K":return"a king"}};async function C(e,a,t){a?t.hasReactedToHoleCard||(await d(`I had ${b(e.rank)}.`),t.hasReactedToHoleCard=!0):t.hasReactedToDealerCard||(await d(`I got ${b(e.rank)}.`),t.hasReactedToDealerCard=!0),e.isFaceCard()&&await E(t),e.isAce()&&await H(t)}async function P(e,a){a.hasReactedToPlayerCard||(await d(`You got ${b(e.rank)}.`),a.hasReactedToPlayerCard=!0),e.isFaceCard()&&await E(a),e.isAce()&&await H(a)}var T=0,I=1,L=2,R=3,S=async function(e,a){let t="";switch(e.roundEndState){case u:switch(e.roundEndCondition){case T:t="*Hot dog!* I started off with a blackjack. *I win!*";break;case I:t="I got 21. That's blackjack! *I win!*";break;case L:t="You went over 21 and busted. *I win!*";break;case R:t="Phew! I made it over 17 with the highest score. *I win!*"}break;case h:switch(e.roundEndCondition){case T:t="*Lucky!* You started off with a blackjack. *You win!*";break;case I:t="You got 21. That's blackjack! *You win!*";break;case L:t="Ahh, I went over 21 and busted. *You win!*";break;case R:t="You have the higher score! *You win!*"}break;case y:switch(t="It's a *tie!*",e.roundEndCondition){case T:t="We both have natural blackjacks! *It's a tie!*"}}await d(t);let n="";if(0===a){switch(e.roundEndState){case u:n="Since I win, you lose 10 coins.";break;case h:n="Since you win, you get 10 coins.";break;case y:n="Since we tied, no one gets any coins"}await d(n)}};async function O(e){0===e?await d("First, I'll deal you a card."):await d("Here's your card.")}async function D(e){0===e?(await d("And one more for me, but this one face down!"),await d("I get to take a little peek, but not you.")):await d("And another for me.")}async function A(e){0===e?await d("Next, I'll deal myself a card."):await d("And here's my card.")}async function M(e){0===e?(await d("Hiya! My name's *Chip*! Let's play some *Blackjack*! (Press *Enter*)"),await d("It's easy: just try and get a *higher score* than me."),await d("But *don't go over 21*!")):await d("Next round!")}async function F(e){0===e?await d("And now I'll deal you another card."):await d("And another for you.")}async function x(e){e.roundCount>0&&e.roundCount%2==0&&(e.bet*=2,await d(`Let's raise the stakes! I'll increase the bet to ${e.bet}`))}var j=e=>{let a=e.shoe.dealFaceUpCard();return e.dealerHand.takeCard(a),a},Y=e=>{let a=e.shoe.dealFaceDownCard();return e.dealerHand.takeCard(a),a},N=e=>{let a=e.shoe.dealFaceUpCard();return e.playerHand.takeCard(a),a},B=e=>{e.domElements.playerControls.className=""},$={Hit:0,Stand:1},W=(e,a,t)=>{const n=t.domElements.hitButton,o=t.domElements.standButton;return n.innerHTML=i(e),o.innerHTML=i(a),new Promise((e,a)=>{const i=()=>{n.removeEventListener("click",i),o.removeEventListener("click",r),B(t),e($.Hit)},r=()=>{n.removeEventListener("click",i),o.removeEventListener("click",r),B(t),e($.Stand)};n.addEventListener("click",i),o.addEventListener("click",r),(e=>{e.domElements.playerControls.className="active"})(t)})},U=class{constructor(){this.cards=[]}takeCard(e){this.cards.push(e)}getPipTotal(e){let a=0,t=0;if(this.cards.forEach(n=>{if(e||n.isFaceUp)switch(n.rank){case"A":t++;break;case"2":a+=2;break;case"3":a+=3;break;case"4":a+=4;break;case"5":a+=5;break;case"6":a+=6;break;case"7":a+=7;break;case"8":a+=8;break;case"9":a+=9;break;case"10":case"J":case"Q":case"K":a+=10}}),t>0){let e=11*t;for(;a+e>21&&e!=t;)e-=10;a+=e}return a}},K=class{constructor(e,a){this.domElement=a,this.hand=e,this.listElement=this.domElement.querySelector("ul"),this.pipTotalElement=this.domElement.querySelector(".pip-total"),this.pipTotalElement.className="pip-total"}refreshHand(){for(this.domElement.classList.contains("hidden")&&this.domElement.classList.remove("hidden");this.listElement.firstChild;)this.listElement.removeChild(this.listElement.firstChild);let e=this.hand.cards.length-1;this.hand.cards.forEach((a,t)=>{const n=document.createElement("li"),o=a.isFaceUp;n.classList=`card ${o?a.suit.toLowerCase():"facedown"}`,t===e&&(n.classList+=" new"),o&&n.setAttribute("data-rank",a.rank),this.listElement.appendChild(n)});const a=this.hand.getPipTotal();this.pipTotalElement.innerHTML=a,a>0&&"pip-total"===this.pipTotalElement.className&&(this.pipTotalElement.className+=" active")}hideHand(){this.domElement.classList.add("hidden"),this.pipTotalElement.innerHTML="0"}},_=e=>{let a;return a=e.dealerHand.cards[1].isFaceUp?j(e):(e=>(e.dealerHand.cards[1].isFaceUp=!0,e.dealerHand.cards[1]))(e)},q=e=>21===e.playerHand.getPipTotal()?{isRoundOver:!0,roundEndState:h,roundEndCondition:I}:e.playerHand.getPipTotal()>21?{isRoundOver:!0,roundEndState:u,roundEndCondition:L}:21===e.dealerHand.getPipTotal()?{isRoundOver:!0,roundEndState:u,roundEndCondition:I}:e.dealerHand.getPipTotal()>21?{isRoundOver:!0,roundEndState:h,roundEndCondition:L}:e.dealerHand.getPipTotal()>17?e.dealerHand.getPipTotal()>e.playerHand.getPipTotal()?{isRoundOver:!0,roundEndState:u,roundEndCondition:R}:e.playerHand.getPipTotal()>e.dealerHand.getPipTotal()?{isRoundOver:!0,roundEndState:h,roundEndCondition:R}:{isRoundOver:!0,roundEndState:y}:{isRoundOver:!1},J=e=>{let a=e.dealerHand.getPipTotal(!0),t=e.playerHand.getPipTotal();return 21===a?21===t?{isRoundOver:!0,roundEndState:y,roundEndCondition:T}:{isRoundOver:!0,roundEndState:u,roundEndCondition:T}:21===t?{isRoundOver:!0,roundEndState:h,roundEndCondition:T}:{isRoundOver:!1}},Q=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],z=["Clubs","Diamonds","Hearts","Spades"],G=class{constructor(){this.cards=[],z.forEach(e=>{Q.forEach(a=>{this.cards.push(new class{constructor(e,a,t){this.suit=e,this.rank=a,this.isFaceUp=t}isFaceCard(){return"J"===this.rank||"Q"===this.rank||"K"===this.rank}isAce(){return"A"===this.rank}}(e,a,!1))})}),n(this.cards)}},V=e=>{e.domElements.betDisplay.innerHTML=e.bet},X=(e,a)=>{a.previousPlayerPot=a.playerPot,e.roundEndState===u&&(a.playerPot-=a.bet),e.roundEndState===h&&(a.playerPot+=a.bet)},Z=e=>{let a=e.domElements.scoreDisplay,t=e.domElements.scoreDisplay.parentElement,n=e.playerPot;e.playerPot>999?n="999":e.playerPot<100?n=`<span class="leading-zero">0</span>${e.playerPot}`:e.playerPot<10&&(n=`<span class="leading-zero">00</span>${e.playerPot}`),a.innerHTML=n,e.playerPot<e.previousPlayerPot&&(t.classList+=" decrease"),e.playerPot>e.previousPlayerPot&&(t.classList+=" increase"),setTimeout(()=>{t.classList="player-pot-display"},500)};const ee={chipDialog:document.getElementById("dealer-dialog"),playerHand:document.getElementById("player-hand"),dealerHand:document.getElementById("dealer-hand"),hitButton:document.getElementById("action-hit"),standButton:document.getElementById("action-stand"),scoreDisplay:document.getElementById("player-pot"),betDisplay:document.getElementById("bet-display"),playerControls:document.getElementById("player-controls")};let ae={roundCount:0,dialogLevel:0,dialogKeys:[],mood:0,hasExplainedPot:!1,hasReactedToPlayerCard:!1,hasReactedToHoleCard:!1,hasExplainedFaceCard:!1,hasExplainedAceCard:!1,domElements:ee,playerPot:100,bet:10,shoe:new class{constructor(e){this.deckCount=e,this.reset()}dealFaceUpCard(){const e=this.cards.pop();return e.isFaceUp=!0,e}dealFaceDownCard(){const e=this.cards.pop();return e.isFaceUp=!1,e}needsReset(){return this.cards.length<this.splitCount}reset(){this.cards=[];for(let e=0;e<this.deckCount;e++){let e=new G;this.cards.push(...e.cards)}n(this.cards),this.splitCount=r(20,this.cards.length-1)}}(3),playerHand:null,playerHandDisplay:null,dealerHand:null,dealerHandDisplay:null,hasExplainedFaceCard:!1,hasExplainedAceCard:!1};async function te(e){let a=J(e);return a.isRoundOver&&(e.dealerHand.cards.length>1&&(_(e),e.dealerHandDisplay.refreshHand()),await ne(a,e)),a.isRoundOver}async function ne(e,a){await S(e,a.roundCount),X(e,a),Z(a),await p(e,a),a.roundCount++}l.setOutputTarget(ee.chipDialog),async function(){for(Z(ae);;){if(ae.playerPot<=0){await w();break}await x(ae),V(ae),ae.playerHandDisplay&&ae.playerHandDisplay.hideHand(),ae.dealerHandDisplay&&ae.dealerHandDisplay.hideHand();let e=null;if(ae.shoe.needsReset()&&ae.shoe.reset(),await M(ae.roundCount),ae.playerHand=new U,ae.playerHandDisplay=new K(ae.playerHand,ee.playerHand),ae.playerHandDisplay.refreshHand(),ae.dealerHand=new U,ae.dealerHandDisplay=new K(ae.dealerHand,ee.dealerHand),ae.dealerHandDisplay.refreshHand(),e=N(ae),ae.playerHandDisplay.refreshHand(),await O(ae.roundCount),await P(e,ae),e=j(ae),ae.dealerHandDisplay.refreshHand(),await A(ae.roundCount),await C(e,!1,ae),e=N(ae),ae.playerHandDisplay.refreshHand(),await F(ae.roundCount),await P(e,ae),await te(ae))continue;if(Y(ae),ae.dealerHandDisplay.refreshHand(),await D(ae.roundCount),await te(ae))continue;let a=-1;for(;;){a++;let t=await g(ae.roundCount,0,ae),n=await W(t.hitPlayerResponse,t.standPlayerResponse,ae);if(n===$.Hit&&(await d(t.hitChipResponse),t.hitAction&&t.hitAction(ae),e=N(ae),ae.dealerHandDisplay.refreshHand(),await P(e,ae)),n===$.Stand){t.standAction&&t.standAction(ae);let a=!0;for(;;){let n=!ae.dealerHand.cards[1].isFaceUp;if(a?(await d(t.standChipResponse),a=!1):await c(),e=_(ae),ae.dealerHandDisplay.refreshHand(),await C(e,n,ae),q(ae).isRoundOver)break}}let o=q(ae);if(o.isRoundOver){await ne(o,ae);break}}}}()}]);