let suits = ["H", "D", "C", "S"];
let values = [2,3,4,5,6,7,8,9,10,"J", "Q", "K", "A"];
let index = 0;
let dealerIndex = 0;
let autoDeal;
let playerCards = [];
let playerHandValue = 0;
let dealerCards = [];
let dealerHandValue = 0;
let display;
let dealt;

// New class to create all cards
class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
		this.name = value + suit;
	}
}

// New class to create a deck shuffle it and deal cards

class Deck {
	constructor() {
		this.deck = [];
	}
	// Create a methode that generate a new deck 
	generate(){
		for (let suit of suits) {
				for (let value of values) {
					this.deck.push(new Card(value, suit));
			}
		}
		return this.deck;	
	}
	// Create a methode that shuffle the new deck
	shuffle() { 
 		var currentIndex = this.deck.length, temporaryValue, randomIndex;

  		// While there remain elements to shuffle...
 		while (currentIndex !== 0) {

    		// Pick a remaining element...
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

    		// And swap it with the current element.
    		temporaryValue = this.deck[currentIndex];
   			this.deck[currentIndex] = this.deck[randomIndex];
   			this.deck[randomIndex] = temporaryValue;
  		}
		return this.deck;
	}
	// Create a methode that deal x amount of cards
	deal() {
		let dealtCard = [];
		while(dealtCard.length < 20){
			dealtCard.push(this.deck.pop());
		}
		return dealtCard;
	}
}

// function that start the game

function startGame() {
	clean();
	let deck = new Deck();
	deck.generate();
	deck.shuffle();
	dealt = [];
	dealt = deck.deal();
	playerCards = [];
	dealerCards = [];
	document.querySelector(".endgame").style.display = "none";
	index = 0;
	firstDeal();
	playerCards.push((dealt[1].value), (dealt[3].value));
	dealerCards.push((dealt[2].value));
	dealerHandAddValue();
	playerHandAddValue();
	// checking for blackjack
	setTimeout(function checkBlackjack(){
		if (playerHandValue === 21) {
		document.querySelector(".text").innerText = "Blackjack !";
		document.querySelector(".endgame").style.display = "block";
		}
	}, 3000);
	
}

startGame();

// function that auto deal 4 cards at the begining of the game

function firstDeal(){
	autoDeal = setInterval(showCard, 500);
}

// function that add class to the card to show them on screen

function showCard(){
	let cardName = dealt[index].name;
	let cardID = document.getElementById(cardName);
	cardID.classList.add("visible" + index);
	index ++;
	// Stop the first Deal after 4 cards are dealt
	if (index >= 4) {
		clearInterval(autoDeal);
	}
}

// function that reveal the dealer hidden card

function reveal(){
	let hiddenCard = dealt[0].name;
	let hiddenCardId = document.getElementById(hiddenCard);
	hiddenCardId.classList.add("reveal");
}

function displayDealerCards(){
	display = setInterval(dealerhit, 500);
}

function dealerhit(){
	if (dealerHandValue < 17){
		let dealercardName = dealt[index].name;
		let dealercardID = document.getElementById(dealercardName);
		dealercardID.classList.add("dealer" + dealerIndex);
		dealerCards.push((dealt[index].value))
		dealerHandAddValue();
		index ++;
		dealerIndex ++;
	} else if (dealerHandValue >= 17) {
		clearInterval(display);
		dealerIndex = 0;
		compareHands();
	} else if (dealerHandValue > 21) {
		clearInterval(display);
		dealerIndex = 0;
		document.querySelector(".text").innerText = "You lose !";
		document.querySelector(".endgame").style.display = "block";
	}
}

// function that reset every class modification on card div

function clean(){
	let visible0 = document.getElementsByClassName("visible0");
	let visible1 = document.getElementsByClassName("visible1");
	let visible2 = document.getElementsByClassName("visible2");
	let visible3 = document.getElementsByClassName("visible3");
	let visible4 = document.getElementsByClassName("visible4");
	let visible5 = document.getElementsByClassName("visible5");
	let visible6 = document.getElementsByClassName("visible6");
	let visible7 = document.getElementsByClassName("visible7");
	let dealer0 = document.getElementsByClassName("dealer0");
	let dealer1 = document.getElementsByClassName("dealer1");
	let dealer2 = document.getElementsByClassName("dealer2");
	let reveal = document.getElementsByClassName("reveal");
	if (visible0.length != 0 && visible0){
		visible0[0].classList.remove("visible0");
		index = 0;
	}
	if (visible1.length != 0 && visible1){
		visible1[0].classList.remove("visible1");
		index = 0;
	}
	if (visible2.length != 0 && visible2){
		visible2[0].classList.remove("visible2");
		index = 0;
	}
	if (visible3.length != 0 && visible3){
		visible3[0].classList.remove("visible3");
		index = 0;
	}
	if (visible4.length != 0 && visible4){
		visible4[0].classList.remove("visible4");
		index = 0;
	}
	if (visible5.length != 0 && visible5){
		visible5[0].classList.remove("visible5");
		index = 0;
	}
	if (visible6.length != 0 && visible6){
		visible6[0].classList.remove("visible6");
		index = 0;
	}
	if (visible7.length != 0 && visible7){
		visible7[0].classList.remove("visible7");
		index = 0;
	}
	if (dealer0.length != 0 && dealer0){
		dealer0[0].classList.remove("dealer0");
		index = 0;
	}
	if (dealer1.length != 0 && dealer1){
		dealer1[0].classList.remove("dealer1");
		index = 0;
	}
	if (dealer2.length != 0 && dealer2){
		dealer2[0].classList.remove("dealer2");
		index = 0;
	}
	if (reveal.length != 0 && reveal){
		reveal[0].classList.remove("reveal");
		index = 0;
	}
}

function hit() {
	playerCards.push((dealt[index].value))
	showCard();
	playerHandAddValue();
	checkLose();
}

function stand() {
	reveal();
	dealerCards.push((dealt[0].value))
	dealerHandAddValue();
	displayDealerCards();
}

function playerHandAddValue() {
	playerHandValue = 0;
	for (var i = 0; i < playerCards.length; i++) {
		if (playerCards[i] == "J" || playerCards[i] == "Q" || playerCards[i] == "K") {
			playerHandValue += 10;
		} else if (playerCards[i] == "A" && (playerHandValue + 11) > 21 ) {
			playerHandValue ++;
		} else if (playerCards[i] == "A" && (playerHandValue + 11) <= 21 ) {
			playerHandValue += 11;
		} else {
			playerHandValue += playerCards[i];
		}
	}
	document.querySelector(".playerHandValue").innerText = playerHandValue;
}

function dealerHandAddValue() {
	dealerHandValue = 0;
	for (var i = 0; i < dealerCards.length; i++) {
		if (dealerCards[i] == "J" || dealerCards[i] == "Q" || dealerCards[i] == "K") {
			dealerHandValue += 10
		}else if (dealerCards[i] == "A" && (dealerHandValue + 11) > 21 ) {
			dealerHandValue ++;
		} else if (dealerCards[i] == "A" && (dealerHandValue + 11) <= 21 ) {
			dealerHandValue += 11;
		} else {
			dealerHandValue += dealerCards[i];
		}
	}
	document.querySelector(".dealerHandValue").innerText = dealerHandValue;
}

function compareHands() {
	if (playerHandValue > 21) {
		document.querySelector(".endgame").style.display = "block";
	} else if (dealerHandValue <= 21 && dealerHandValue > playerHandValue) {
		document.querySelector(".text").innerText = "You lose !";
		document.querySelector(".endgame").style.display = "block";
	} else if (dealerHandValue <= 21 && playerHandValue <= 21 && dealerHandValue < playerHandValue) {
		document.querySelector(".text").innerText = "You Win !";
		document.querySelector(".endgame").style.display = "block";
	} else if (dealerHandValue <= 21 && playerHandValue <= 21 && dealerHandValue > playerHandValue) {
		document.querySelector(".text").innerText = "You Lose !";
		document.querySelector(".endgame").style.display = "block";
	} else if (dealerHandValue == playerHandValue) {
		document.querySelector(".text").innerText = "You Lose !";
		document.querySelector(".endgame").style.display = "block";
	}else if (dealerHandValue > 21) {
		document.querySelector(".text").innerText = "You Win !";
		document.querySelector(".endgame").style.display = "block";
	}
}


function checkLose() {
	if (playerHandValue > 21) {
		document.querySelector(".endgame").style.display = "block";
		document.querySelector(".text").innerText = "You lose !";
		stand();
	}
}