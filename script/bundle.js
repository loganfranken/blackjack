!function(e){var a={};function t(n){if(a[n])return a[n].exports;var o=a[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var o in e)t.d(n,o,function(a){return e[a]}.bind(null,o));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=0)}([function(e,a,t){"use strict";t.r(a);const n=e=>{let a=e.length;for(;0!==a;){const t=Math.floor(Math.random()*a),n=e[a-=1];e[a]=e[t],e[t]=n}},o=e=>new Promise((a,t)=>{setTimeout(()=>{a()},e)}),i=e=>{let a=!1,t="";for(let n=0;n<e.length;n++){const o=e[n];"*"===o?(t+=a?"</strong>":"<strong>",a=!a):t+=o}return t},r=(e,a)=>(e=Math.ceil(e),a=Math.floor(a),Math.floor(Math.random()*(a-e+1))+e),s=e=>e[Math.floor(Math.random()*e.length)],l=e=>"function"==typeof e;window.DialogManager=window.DialogManager||new class{constructor(e){this.currMessageIndex=0,this.domElement=null,this.isSkipping=!1,this.isTalking=!1,this.onFinished=null}setOutputTarget(e){this.domElement=e}async outputMessage(e,a){this.isTalking=!0,this.isFinished=!1;let t=0;const n=e.length;for(;this.isTalking;){if(this.isSkipping){this.domElement.innerHTML=i(e),this.isSkipping=!1,this.isTalking=!1;break}const a=e[t];this.domElement.innerHTML=i(e.slice(0,t+1)),t++;let r=30;"."!==a&&"?"!==a&&"!"!==a||(r=200),t<n?await o(r):this.isTalking=!1}a||await new Promise(e=>{this.onFinished=e})}advanceMessage(){this.isTalking?this.isSkipping||(this.isSkipping=!0):(null!=this.onFinished&&this.onFinished(),this.onFinished=null)}};var d=window.DialogManager;async function u(e,a){if(l(e))await e();else if(Array.isArray(e))for(let t=0;t<e.length;t++)l(e[t])?await e[t]():await d.outputMessage(e[t],a);else await d.outputMessage(e,a)}var h=async function(e){if(2===e.dealerHand.cards.length){switch(r(0,1)){case 0:return void await u("Now I'll deal myself a card.");case 1:return void await u("Now I'll take another card.")}}switch(r(0,4)){case 0:return void await u("Another for me.");case 1:return void await u("One more for me.");case 2:return void await u("I'll take another.");case 3:return void await u("Another card coming my way.");case 4:return void await u("I'll keep going.")}},c={Default:0,Happy:1,Astonished:2,Awkward:3,Bummed:4,Concerned:5,Questioning:6};async function y(e){!e.hasExplainedPipStandLimit&&e.dealerHand.getPipTotal()>17&&(await u("Alright, my card total is past 17 so I'll stop dealing myself cards."),e.hasExplainedPipStandLimit=!0)}var w={DealerWins:0,PlayerWins:1,Tie:2},p=async function(e,a){e.roundEndState!==w.DealerWins||a.hasExplainedPot||(await u("If you lose all your coins, that's game over!"),a.hasExplainedPot=!0)},m=function(e,a){var t=a.domElements.dealerPicture;switch(e){case c.Default:t.className="default";break;case c.Happy:t.className="happy";break;case c.Astonished:t.className="astonished";break;case c.Awkward:t.className="awkward";break;case c.Bummed:t.className="bummed";break;case c.Concerned:t.className="concerned";break;case c.Questioning:t.className="questioning"}},g=async function(e){e.playerPot<=0?(m(c.Bummed,e),await u("Oh no! That's game over!"),await u("Better luck next time!")):e.playerPot>=999&&(m(c.Awkward,e),await u("Oh, uhh, huh."),await u("This is awkward."),await u("But, umm..."),await u("We're out of money?"),await u("Yeah, you, umm, won all of the money?"),await u("Sorry."),await u("So that's it.")),m(c.Awkward,e),await u("..."),await u("..."),await u("Oh, so I'll just stay here."),await u("But you can close the window or refresh to start a new game."),await u("..."),await u("...yeah."),await u("Alright, well, whenever you're ready."),await u("...")};async function f(e,a,t){t.dialogLevel++;for(let e=0;e<C.length;e++)if(C[e].filter(t)){let a=C[e];return C.splice(e,1),await a.action(t)}return await u("Hit or stand?",!0),k()}function k(){return{hitPlayerResponse:"*Hit*",standPlayerResponse:"*Stand*",hitChipResponse:b(s(["here's your card.","take a card.","a card for you.","here's a card."])),standChipResponse:b(s(["let's look at that hidden card.","I'll flip over my hidden card.","let's reveal the hidden card.","I'll show my card."]))}}function b(e){let a=s([null,"Alright","Okay","Sounds good"]);return a?a+", "+e:e[0].toUpperCase()+e.substring(1)}function v(e,a,t,n){return Math.round(Math.random())?{hitPlayerResponse:`${e} *Hit*`,standPlayerResponse:`${t} *Stand*`,hitChipResponse:a,standChipResponse:n}:{hitPlayerResponse:`${t} *Hit*`,standPlayerResponse:`${e} *Stand*`,hitChipResponse:n,standChipResponse:a}}const C=[{filter:e=>1===e.dialogLevel,action:async()=>(await u("Now you get to make a *choice*..."),await u("You can *hit* and take another card."),await u("Or you can *stand* and I'll start dealing myself cards until I go past *17*."),await u("Sooo, do you want to hit or stand? (*Choose below*)",!0),k())},{filter:e=>2===e.dialogLevel,action:async()=>(await u("Same choice again: hit or stand?",!0),k())},{filter:e=>3===e.dialogLevel,action:async()=>(await u("You know the drill: hit or stand?",!0),k())},{filter:e=>4===e.dialogLevel,action:async()=>(await u("Hit or stand?",!0),k())},{filter:e=>5===e.dialogLevel,action:async e=>(await u("How are you doing today?",!0),v("Pretty good!",[()=>{m(c.Happy,e)},"That's great!",()=>{m(c.Default,e)}],"Not so great.",[()=>{m(c.Bummed,e)},"Oh no, well hopefully this game will cheer you up.",()=>{m(c.Default,e)}]))},{filter:e=>6===e.dialogLevel,action:async e=>(await u("Are you feeling lucky today?",!0),v("Oh, totally!",[()=>{m(c.Happy,e)},"Nice! That's the spirit!",()=>{m(c.Default,e)},()=>{e.dialogKeys.lucky=!0}],"Oof, no, not at all.",[()=>{m(c.Concerned,e)},"Aww, come on. Not with that attitude!",()=>{m(c.Default,e)},()=>{e.dialogKeys["not-lucky"]=!0}]))},{filter:e=>e.dialogKeys.lucky,action:async e=>{await u("What's got you feeling so lucky?",!0);let a=e.playerWinPercentage>50;return v("I've always been a lucky person.",a?"Dang, must be nice! Yeah, you've definitely had some good hands.":"Yeah? Well, I've got to say: I've had most of the luck so far!","I'm just feeling lucky today.",a?"You must be! You've had some good hands!":[()=>{m(c.Concerned,e)},"Oh... yeah?",()=>{m(c.Questioning,e)},"But you haven't really...","Uhh, well, I'm excited for your comeback!",()=>{m(c.Default,e)}])}},{filter:e=>e.dialogKeys["not-lucky"],action:async e=>{await u("Why do you feel so unlucky?",!0);let a=e.playerWinPercentage>50;return v("I never win at anything.",a?[()=>{m(c.Questioning,e)},"Really? You've had some good hands so far, though.",()=>{m(c.Default,e)}]:[()=>{m(c.Questioning,e)},"Well, you haven't had a great game so far...",()=>{m(c.Default,e)},"But maybe things will turn around!"],"I'm just not feeling lucky today.",a?"Well, even if you're not feeling it, you've had some good hands.":[()=>{m(c.Concerned,e)},"Yeah, you've had kind of a tough game, but maybe things will turn around!",()=>{m(c.Default,e)}])}},{filter:e=>8===e.dialogLevel,action:async e=>(await u("Do you like blackjack?",!0),v("I love it.",[()=>{m(c.Happy,e)},"Oh, great! Me too!",()=>{m(c.Default,e)}],"Not really.",[()=>{m(c.Bummed,e)},"Oh...","...really?",()=>{m(c.Questioning,e)},"Then, why are you...","...",()=>{m(c.Concerned,e)},"You know what...","That's okay.","To each their own, right?","All I know is...",()=>{m(c.Default,e)},"I'm enjoying playing with you.","And that's how I feel about it!"]))},{filter:e=>9===e.dialogLevel,action:async e=>(await u("Have you played this game before?",!0),v("Nope, first time.",[()=>{m(c.Questioning,e)},"Oh, really? I wouldn't know.","Your dealer changes each time you play.",()=>{m(c.Default,e)},()=>{e.dialogKeys["first-time"]=!0}],"Oh yeah, remember?",[()=>{m(c.Concerned,e)},"Oh, sorry, no, I don't remember.",()=>{m(c.Questioning,e)},"That wasn't me.","Your dealer changes each time you play.",()=>{m(c.Default,e)},()=>{e.dialogKeys["return-player"]=!0}]))},{filter:e=>e.dialogKeys["first-time"],action:async e=>(await u("Since it's your first time, do you think you'll play again?",!0),v("Oh yeah!",["Nice!",()=>{m(c.Happy,e)},"I'm glad I made such a good first impression!",()=>{m(c.Awkward,e)},"Oh, I mean, not that I'm the reason you would play again.","I mean, I might be, but...","...",()=>{m(c.Questioning,e)},"Anyway...",()=>{m(c.Default,e)},"How about those cards!"],"No, I don't think so.",[()=>{m(c.Bummed,e)},"Oof.","Oh, well.",()=>{m(c.Concerned,e)},"Sorry I didn't make a better first impression.","...","That's okay, though.","That's good feedback.",()=>{m(c.Questioning,e)},"Yeah.","Good feedback.","...",()=>{m(c.Default,e)},"Okay, Chip, game face!","Alright, let's get back to it."]))},{filter:e=>e.dialogKeys["return-player"],action:async e=>(await u("What was your dealer's name last time?",!0),v("Chip, just like you.",["Oh, yeah? How weird!",()=>{m(c.Awkward,e)},"...","Actually, I knew that.","We're all named Chip.","I was just kidding.",()=>{m(c.Questioning,e)},"Sorry, that was weird I tricked you.","I thought it would be funny.",()=>{m(c.Awkward,e)},"...","Anyway...",()=>{m(c.Default,e)}],"Harold.",[()=>{m(c.Questioning,e)},"Uhh... what?","Oh, are you messing with me?",()=>{m(c.Awkward,e)},"We're all named Chip.","Oh, you are messing with me, huh?",()=>{m(c.Default,e)},"Ahh, good one!"]))},{filter:e=>11===e.dialogLevel&&e.playerWinPercentage>=50,action:async e=>(await u("Dang, you're doing really well."),await u("You're not some kind of card shark are you?",!0),v("What? Of course not!",[()=>{m(c.Concerned,e)},"Oh! No, I'm just joking!",()=>{m(c.Awkward,e)},"I wouldn't even know how to spot a card shark, honestly.",()=>{m(c.Questioning,e)},"Whoa, please don't tell anyone that.",()=>{m(c.Default,e)},()=>{e.dialogKeys["card-shark"]=!0}],"Oh, totally.",[()=>{m(c.Concerned,e)},"...","Wait, what?",()=>{m(c.Questioning,e)},"Seriously?","I was just joking.","You're messing with me, right?",()=>{m(c.Awkward,e)},"I hope so.","I wouldn't even know how to spot a card shark, honestly.",()=>{m(c.Questioning,e)},"Whoa, please don't tell anyone that.",()=>{m(c.Default,e)},()=>{e.dialogKeys["card-shark"]=!0}]))},{filter:e=>11===e.dialogLevel&&e.playerWinPercentage<50,action:async e=>(await u("Oof, so it's kind of been a rough game for you, huh?"),await u("Well, at least you're not a card shark.",!0),v("Haha, right?",[()=>{m(c.Happy,e)},"Just kidding!",()=>{m(c.Awkward,e)},"Sorry, that was kind of mean.","I wouldn't even know how to spot a card shark, honestly.",()=>{m(c.Concerned,e)},"Whoa, please don't tell anyone that.",()=>{m(c.Default,e)}],"...yeah, I guess not.",[()=>{m(c.Bummed,e)},"Oh, uhh, geez! I'm sorry!",()=>{m(c.Awkward,e)},"I was just joking.","I wouldn't even know how to spot a card shark, honestly.",()=>{m(c.Concerned,e)},"Whoa, please don't tell anyone that.",()=>{m(c.Default,e)}]))},{filter:e=>12===e.dialogLevel,action:async e=>(m(c.Concerned,e),await u("Hey, so..."),m(c.Questioning,e),await u("You're not going to tell anyone about the card shark thing, right?",!0),v("Your secret's safe with me.",[()=>{m(c.Default,e)},"Phew, thanks."],"I'm telling everyone.",[()=>{m(c.Bummed,e)},"Aww, come on.",()=>{m(c.Concerned,e)},"Don't be like that!",()=>{m(c.Questioning,e)},"Please, I've got a reputation here!",()=>{m(c.Concerned,e)},"...",()=>{m(c.Questioning,e)},"Nah, come on, you won't tell, right?","...","After all of the blackjack we've been through?","...","I'm pretty sure you're messing with me.","Pretty sure.","Yeah, good one!",()=>{m(c.Default,e)}]))},{filter:e=>13===e.dialogLevel,action:async e=>(await u("Card sharks are super interesting, though."),await u("What do you think it takes to be a card shark?",!0),v("A good memory.",["Right?","It seems so hard to remember all of those cards."],"Sharp math skills.",["Yeah, you're probably right.",()=>{m(c.Questioning,e)},"A good memory seems important too, though, right?",()=>{m(c.Default,e)}]))},{filter:e=>14===e.dialogLevel,action:async e=>(await u("Memory is a weird thing, you know?"),m(c.Questioning,e),await u("We rely on it for everything, but we forget *so much*!"),await u("I sometimes wonder if it's just a little box in there."),await u("And it can only hold so much."),m(c.Concerned,e),await u("And if I remember something new, do I forget something else?"),await u("And what if I'm not trying to remember something and then there it goes?"),m(c.Bummed,e),await u("*Poof!* There goes my favorite memory!"),await u("Replaced by a weird story someone told me about eating figs!"),m(c.Awkward,e),await u("..."),await u("Oh, whoa, sorry."),await u("I just started rambling there."),m(c.Default,e),await u("Well, enough, about me: what about your memory?"),await u("I mean, can you even remember how many rounds we've played so far?",!0),v(`Uhh, ${e.roundCount+1}.`,[()=>{m(c.Happy,e)},"That's right!","Wow, you have a good memory!",()=>{m(c.Default,e)}],`Uhh, ${e.roundCount+2}.`,[()=>{m(c.Concerned,e)},"Ahh, sorry, that's wrong.",()=>{m(c.Default,e)},"But, hey, at least you're saving that room for something else."]))},{filter:e=>15===e.dialogLevel,action:async e=>(m(c.Concerned,e),await u("..."),await u("Hey, listen, can I ask you something?",!0),m(c.Questioning,e),v("Yeah, of course.",["Oh, yeah?",()=>{m(c.Default,e)},"Okay.","...","After I deal!",()=>{e.dialogKeys["ask-final-question"]=!0}],"No, I want to focus on the game.",["Oh, hey, okay.",()=>{m(c.Concerned,e)},"That's okay.",()=>{m(c.Questioning,e)},"You're right.","Let's focus on the game.",()=>{m(c.Default,e)},()=>{e.dialogKeys["ask-final-question"]=!1}]))},{filter:e=>16===e.dialogLevel&&e.dialogKeys["ask-final-question"],action:async e=>(e.isGameOver=!0,m(c.Concerned,e),await u("Okay, about that question..."),await u("..."),m(c.Questioning,e),await u("Do you think you'll remember me?"),await u("..."),m(c.Concerned,e),await u("What I'm saying is, if you closed this browser window right now."),await u("And came back, there would be a new Chip."),await u("And I... or they, wouldn't remember any of this."),m(c.Questioning,e),await u("And that's okay."),await u("..."),m(c.Concerned,e),await u("I mean, it's not really okay."),m(c.Questioning,e),await u("But what can you do, right?"),m(c.Concerned,e),await u("And, so, I just..."),await u("I'm just wondering..."),await u("Do you think you would remember me?"),await u("..."),m(c.Questioning,e),await u("Do you think you would?",!0),v("Yes, Chip, I would.",[()=>{m(c.Concerned,e)},"...",()=>{m(c.Default,e)},"Thanks.","I know I'm kind of unloading on you.","But that was really nice to hear.","...",()=>{m(c.Concerned,e)},"Listen, this is weird, but...","I don't really feel like dealing anymore.",()=>{m(c.Questioning,e)},"Sorry, I know that's weird.",()=>{m(c.Default,e)},"It's been really fun playing with you.","And really nice talking with you.",()=>{m(c.Concerned,e)},"But I think I need a little time to sit, and just...",()=>{m(c.Questioning,e)},"Yeah.","If it's okay with you, I'd just like to sit here.",()=>{m(c.Concerned,e)},"And be quiet for a little while.","When you're ready, you can go ahead and close the browser.",()=>{m(c.Default,e)},"It was really nice playing with you!","..."],"No, Chip, I wouldn't.",[()=>{m(c.Concerned,e)},"Oh...","...",()=>{m(c.Bummed,e)},"That's honest.","...",()=>{m(c.Concerned,e)},"No, really, thanks for being honest.","...","Oof.",()=>{m(c.Questioning,e)},"Listen, I can't really deal anymore.","Sorry.","I know that's weird.","I'm sorry.","It just doesn't, I don't feel...",()=>{m(c.Concerned,e)},"...","I'm just going to sit here.",()=>{m(c.Questioning,e)},"And be quiet for a little while.","You can close the browser whenever you're ready.","...",()=>{m(c.Concerned,e)}]))}];async function I(e){e.hasExplainedFaceCard||(m(c.Astonished,e),await u("Raise your trumpets! Here comes royalty!"),await u("..."),m(c.Awkward,e),await u("The first face card, I mean."),await u("Anyway..."),m(c.Default,e),await u("Face cards are worth ten points."),e.hasExplainedFaceCard=!0)}async function H(e){e.hasExplainedAceCard||(m(c.Happy,e),await u("Ooh, spicy: an ace!"),m(c.Default,e),await u("The ace is tricky: it's worth 11 unless it would push your score over 21."),await u("Then it's only worth one point."),e.hasExplainedAceCard=!0)}var E=e=>{switch(e){case"A":return"an ace";case"2":return"a two";case"3":return"a three";case"4":return"a four";case"5":return"a five";case"6":return"a six";case"7":return"a seven";case"8":return"an eight";case"9":return"a nine";case"10":return"a ten";case"J":return"a jack";case"Q":return"a queen";case"K":return"a king"}};async function D(e,a,t){a?t.hasReactedToHoleCard||(await u(`I had ${E(e.rank)}.`),t.hasReactedToHoleCard=!0):t.hasReactedToDealerCard||(await u(`I got ${E(e.rank)}.`),t.hasReactedToDealerCard=!0),e.isFaceCard()&&await I(t),e.isAce()&&await H(t)}async function P(e,a){a.hasReactedToPlayerCard||(await u(`You got ${E(e.rank)}.`),a.hasReactedToPlayerCard=!0),e.isFaceCard()&&await I(a),e.isAce()&&await H(a)}var A=0,T=1,O=2,W=3,S=async function(e,a){switch(e.roundEndState){case w.DealerWins:switch(e.roundEndCondition){case A:m(c.Happy,a),await u("*Hot dog!* I started off with a blackjack!"),m(c.Awkward,a),await u("..."),await u("Oof, sorry to gloat!"),await u("Well, I guess I got lucky: that's a win for me.");break;case T:await u("Oh, 21 for me! That's blackjack!"),await u("Looks like I win this round.");break;case O:m(c.Bummed,a),await u("Oh no! You went over 21 and busted!"),m(c.Default,a),await u("Better luck next round!");break;case W:await u("Phew! I made it over 17 with the highest score."),await u("That's a win for me.")}break;case w.PlayerWins:switch(e.roundEndCondition){case A:m(c.Astonished,a),await u("*What!*"),await u("You started off with a blackjack!"),m(c.Happy,a),await u("*Lucky!*"),await u("You win that round!");break;case T:m(c.Happy,a),await u("Look at you, you made it to 21!"),await u("That's blackjack! You win!"),m(c.Default,a);break;case O:await u("Ahh, I went over 21 and busted! Dang!"),m(c.Happy,a),await u("Well, that's a win for you!");break;case W:m(c.Happy,a),await u("You have the higher score! *You win!*")}break;case w.Tie:switch(e.roundEndCondition){case A:m(c.Astonished,a),await u("Whoa!"),await u("Whoa-oooah!"),await u("We both have blackjacks!"),await u("That's a *magical* tie!");break;default:m(c.Astonished,a),await u("Oh, whoa! It's a tie!")}}let t="";if(0===a.roundCount){switch(e.roundEndState){case w.DealerWins:t=`Since I win, you lose the current bet, which is *${a.bet} coins*.`;break;case w.PlayerWins:t=`Since you win, you get the current bet, which is *${a.bet} coins*.`;break;case w.Tie:t=`Since we tied, no one wins the bet, which is *${a.bet} coins*.`}(e=>{e.domElements.betDisplay.className="active"})(a),await u(t)}};async function L(e){0===e?await u("First, I'll deal you a card."):await u("Here's your card.")}async function R(e){0===e?(await u("And one more for me, but this one face down!"),await u("I get to take a little peek, but not you."),await u("If I'm real lucky and start off with a blackjack, then that's a win for me!")):await u("And another for me.")}async function j(e){0===e?await u("Next, I'll deal myself a card."):await u("And here's my card.")}async function B(e){0===e?(await u("Hiya! My name's *Chip*! Let's play some *Blackjack*! (Press *Enter*, *Spacebar*, or *click* anywhere)"),await u("It's easy: just try and get a *higher score* than me."),await u("But *don't go over 21*!")):await u("Next round!")}async function M(e){0===e?await u("And now I'll deal you another card."):await u("And another for you.")}async function Q(e){e.dialogLevel>5&&e.bet<100&&(e.bet+=10,await u(`Let's raise the stakes! I'll increase the bet to *${e.bet}*.`))}var N=e=>{let a=e.shoe.dealFaceUpCard();return e.dealerHand.takeCard(a),a},Y=e=>{let a=e.shoe.dealFaceDownCard();return e.dealerHand.takeCard(a),a},F=e=>{let a=e.shoe.dealFaceUpCard();return e.playerHand.takeCard(a),a},x=e=>{e.domElements.playerControls.className="",e.domElements.playerControlButtons.forEach(e=>e.blur())},_={Hit:0,Stand:1},K=(e,a,t)=>{const n=t.domElements.hitButton,o=t.domElements.standButton;return n.innerHTML=i(e),o.innerHTML=i(a),new Promise((e,a)=>{const i=a=>{a.stopPropagation(),n.removeEventListener("click",i),o.removeEventListener("click",r),x(t),e(_.Hit)},r=a=>{a.stopPropagation(),n.removeEventListener("click",i),o.removeEventListener("click",r),x(t),e(_.Stand)};n.addEventListener("click",i),o.addEventListener("click",r),(e=>{e.domElements.playerControls.className="active"})(t)})},U=class{constructor(){this.cards=[]}takeCard(e){this.cards.push(e)}getPipTotal(e){let a=0,t=0;if(this.cards.forEach(n=>{if(e||n.isFaceUp)switch(n.rank){case"A":t++;break;case"2":a+=2;break;case"3":a+=3;break;case"4":a+=4;break;case"5":a+=5;break;case"6":a+=6;break;case"7":a+=7;break;case"8":a+=8;break;case"9":a+=9;break;case"10":case"J":case"Q":case"K":a+=10}}),t>0){let e=11*t;for(;a+e>21&&e!=t;)e-=10;a+=e}return a}},$=class{constructor(e,a){this.domElement=a,this.hand=e,this.listElement=this.domElement.querySelector("ul"),this.pipTotalElement=this.domElement.querySelector(".pip-total"),this.pipTotalElement.className="pip-total"}refreshHand(){for(this.domElement.classList.contains("hidden")&&this.domElement.classList.remove("hidden");this.listElement.firstChild;)this.listElement.removeChild(this.listElement.firstChild);let e=this.hand.cards.length-1;this.hand.cards.forEach((a,t)=>{const n=document.createElement("li"),o=a.isFaceUp;n.classList=`card ${o?a.suit.toLowerCase():"facedown"}`,t===e&&(n.classList+=" new"),o&&n.setAttribute("data-rank",a.rank),this.listElement.appendChild(n)});const a=this.hand.getPipTotal();this.pipTotalElement.innerHTML=a,a>0&&"pip-total"===this.pipTotalElement.className&&(this.pipTotalElement.className+=" active")}hideHand(){this.domElement.classList.add("hidden"),this.pipTotalElement.innerHTML="0"}},q=e=>{let a;return a=e.dealerHand.cards[1].isFaceUp?N(e):(e=>(e.dealerHand.cards[1].isFaceUp=!0,e.dealerHand.cards[1]))(e)},G=e=>21===e.playerHand.getPipTotal()?{isRoundOver:!0,roundEndState:w.PlayerWins,roundEndCondition:T}:e.playerHand.getPipTotal()>21?{isRoundOver:!0,roundEndState:w.DealerWins,roundEndCondition:O}:21===e.dealerHand.getPipTotal()?{isRoundOver:!0,roundEndState:w.DealerWins,roundEndCondition:T}:e.dealerHand.getPipTotal()>21?{isRoundOver:!0,roundEndState:w.PlayerWins,roundEndCondition:O}:e.dealerHand.getPipTotal()>17?e.dealerHand.getPipTotal()>e.playerHand.getPipTotal()?{isRoundOver:!0,roundEndState:w.DealerWins,roundEndCondition:W}:e.playerHand.getPipTotal()>e.dealerHand.getPipTotal()?{isRoundOver:!0,roundEndState:w.PlayerWins,roundEndCondition:W}:{isRoundOver:!0,roundEndState:w.Tie}:{isRoundOver:!1},J=e=>{let a=e.dealerHand.getPipTotal(!0),t=e.playerHand.getPipTotal();return 21===a?21===t?{isRoundOver:!0,roundEndState:w.Tie,roundEndCondition:A}:{isRoundOver:!0,roundEndState:w.DealerWins,roundEndCondition:A}:21===t?{isRoundOver:!0,roundEndState:w.PlayerWins,roundEndCondition:A}:{isRoundOver:!1}},z=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],V=["Clubs","Diamonds","Hearts","Spades"],X=class{constructor(){this.cards=[],V.forEach(e=>{z.forEach(a=>{this.cards.push(new class{constructor(e,a,t){this.suit=e,this.rank=a,this.isFaceUp=t}isFaceCard(){return"J"===this.rank||"Q"===this.rank||"K"===this.rank}isAce(){return"A"===this.rank}isNumber(){return!this.isAce()&&!this.isFaceCard()}}(e,a,!1))})}),n(this.cards)}};function Z(e,a,t){let n=[],o=0;for(;n.length<a;){let a=e[o];null!=a&&t(a)&&(n.push(a),e[o]=null),o++}return n}var ee=e=>{e.domElements.betDisplay.innerHTML=e.bet},ae=(e,a)=>{a.previousPlayerPot=a.playerPot,e.roundEndState===w.DealerWins&&(a.playerPot-=a.bet),e.roundEndState===w.PlayerWins&&(a.playerPot+=a.bet)},te=e=>{let a=e.domElements.scoreDisplay,t=e.domElements.scoreDisplay.parentElement,n=e.playerPot;e.playerPot>999?n="999":e.playerPot<0?n='<span class="leading-zero">000</span>':e.playerPot<100?n=`<span class="leading-zero">0</span>${e.playerPot}`:e.playerPot<10&&(n=`<span class="leading-zero">00</span>${e.playerPot}`),a.innerHTML=n,e.playerPot<e.previousPlayerPot&&(t.classList+=" decrease"),e.playerPot>e.previousPlayerPot&&(t.classList+=" increase"),setTimeout(()=>{t.classList="player-pot-display"},500)};!async function(e){e.forEach(e=>{(new Image).src=e})}(["./images/card_back.png","./images/chip_face_astonished.png","./images/chip_face_awkward.png","./images/chip_face_bummed.png","./images/chip_face_concerned.png","./images/chip_face_happy.png","./images/chip_face_questioning.png","./images/club.png","./images/diamond.png","./images/felt.png","./images/heart.png","./images/spade.png"]);const ne={chipDialog:document.getElementById("dealer-dialog"),playerHand:document.getElementById("player-hand"),dealerHand:document.getElementById("dealer-hand"),hitButton:document.getElementById("action-hit"),standButton:document.getElementById("action-stand"),scoreDisplay:document.getElementById("player-pot"),betDisplay:document.getElementById("bet-display"),playerControls:document.getElementById("player-controls"),dealerPicture:document.getElementById("dealer-picture")};ne.playerControlButtons=ne.playerControls.querySelectorAll("button");let oe={roundCount:0,dealerWinCount:0,playerWinCount:0,dealerWinPercentage:0,playerWinPercentage:0,dialogLevel:0,dialogKeys:[],hasExplainedPot:!1,hasReactedToPlayerCard:!1,hasReactedToHoleCard:!1,hasExplainedFaceCard:!1,hasExplainedAceCard:!1,domElements:ne,playerPot:50,bet:10,shoe:new class{constructor(e){this.deckCount=e,this.reset()}dealFaceUpCard(){const e=this.cards.shift();return e.isFaceUp=!0,e}dealFaceDownCard(){const e=this.cards.shift();return e.isFaceUp=!1,e}needsReset(){return this.cards.length<this.splitCount}reset(){this.cards=[];for(let e=0;e<this.deckCount;e++){let e=new X;this.cards.push(...e.cards)}n(this.cards),this.splitCount=r(20,this.cards.length-1)}}(3),playerHand:null,playerHandDisplay:null,dealerHand:null,dealerHandDisplay:null,hasExplainedFaceCard:!1,hasExplainedAceCard:!1,hasExplainedPipStandLimit:!1,isGameOver:!1};async function ie(e){let a=J(e);return a.isRoundOver&&(e.dealerHand.cards.length>1&&(q(e),e.dealerHandDisplay.refreshHand()),await re(a,e)),a.isRoundOver}async function re(e,a){await S(e,a),ae(e,a),te(a),await p(e,a),a.roundCount++,e.roundEndState===w.DealerWins&&a.dealerWinCount++,e.roundEndState===w.PlayerWins&&a.playerWinCount++,a.dealerWinPercentage=a.dealerWinCount/a.roundCount*100,a.playerWinPercentage=a.playerWinCount/a.roundCount*100}oe.shoe.cards=function(e){let a=e.slice(),t=[];t.push(...Z(a,8,e=>e.isNumber())),t.push(...Z(a,1,e=>e.isFaceCard())),t.push(...Z(a,4,e=>e.isNumber())),t.push(...Z(a,1,e=>e.isAce()));for(var n=0;n<a.length;n++)null!=a[n]&&t.push(a[n]);return t}(oe.shoe.cards),d.setOutputTarget(ne.chipDialog),document.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),d.advanceMessage())}),document.addEventListener("click",()=>{d.advanceMessage()}),async function(){for(te(oe);oe.roundCount>0&&m(c.Default,oe),!oe.isGameOver;){if(oe.playerPot<=0||oe.playerPot>=999){await g(oe);break}await Q(oe),ee(oe),oe.playerHandDisplay&&oe.playerHandDisplay.hideHand(),oe.dealerHandDisplay&&oe.dealerHandDisplay.hideHand();let e=null;if(oe.shoe.needsReset()&&oe.shoe.reset(),await B(oe.roundCount),oe.playerHand=new U,oe.playerHandDisplay=new $(oe.playerHand,ne.playerHand),oe.playerHandDisplay.refreshHand(),oe.dealerHand=new U,oe.dealerHandDisplay=new $(oe.dealerHand,ne.dealerHand),oe.dealerHandDisplay.refreshHand(),e=F(oe),oe.playerHandDisplay.refreshHand(),await L(oe.roundCount),await P(e,oe),e=N(oe),oe.dealerHandDisplay.refreshHand(),await j(oe.roundCount),await D(e,!1,oe),e=F(oe),oe.playerHandDisplay.refreshHand(),await M(oe.roundCount),await P(e,oe),await ie(oe))continue;if(Y(oe),oe.dealerHandDisplay.refreshHand(),await R(oe.roundCount),await ie(oe))continue;let a=-1;for(;;){a++;let t=await f(oe.roundCount,0,oe),n=await K(t.hitPlayerResponse,t.standPlayerResponse,oe);if(n===_.Hit){if(await u(t.hitChipResponse),oe.isGameOver)break;e=F(oe),oe.playerHandDisplay.refreshHand(),await P(e,oe)}if(n===_.Stand){let a=!0;for(;;){let n=!oe.dealerHand.cards[1].isFaceUp;if(a){if(await u(t.standChipResponse),a=!1,oe.isGameOver)break}else await h(oe);if(e=q(oe),oe.dealerHandDisplay.refreshHand(),await D(e,n,oe),await y(oe),G(oe).isRoundOver)break}if(oe.isGameOver)break}let o=G(oe);if(o.isRoundOver){await re(o,oe);break}}if(oe.isGameOver)break}}()}]);