let suits = ["H", "D", "C", "S"];
let values = [2,3,4,5,6,7,8,9,10,"J", "Q", "K", "A"];

class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
		this.name = value + suit;
	}
}

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

let deck = new Deck();
deck.generate();
deck.shuffle();
console.log(deck.shuffle());
let dealt = deck.deal();
let index = 0;

function showcard(){
	let cardName = dealt[index].name;
	let cardID = document.getElementById(cardName);
	cardID.classList.add("visible" + index);
	index++;
}

function reveal(){
	let hiddenCard = dealt[0].name;
	let hiddenCardId = document.getElementById(hiddenCard);
	hiddenCardId.classList.add("reveal");
}

function clean(){
	let visible0 = document.getElementsByClassName("visible0");
	let visible1 = document.getElementsByClassName("visible1");
	let visible2 = document.getElementsByClassName("visible2");
	let visible3 = document.getElementsByClassName("visible3");
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
	if (reveal.length != 0 && reveal){
		reveal[0].classList.remove("reveal");
		index = 0;
	}
}

