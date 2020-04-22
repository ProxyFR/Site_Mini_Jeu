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
		while(dealtCard.length < 1){
			dealtCard.push(this.deck.pop());
		}
		return dealtCard;
	}
}

let deck = new Deck();
deck.generate();
deck.shuffle();
let distribuer = deck.deal();

let one = distribuer[0].name;
let IdOne = document.getElementById(one);
IdOne.classList.add("visible");

