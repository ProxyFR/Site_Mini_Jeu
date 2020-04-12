// basic variables

let origBoard;
const endGameMessage = document.querySelector(".text");
const winConditions = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [6,4,2]
];

const cells = document.querySelectorAll(".cell");

// Asking Player to enter there name

const firstPlayerName = prompt("Entrer le prenom du premier joueur: ");
const secondPlayerName = prompt("Entrer le prenom du deuxième joueur: ");

class Player {
	constructor(mark, name) {
		this.mark = mark;
		this.name = name;
	}
}

const Player1 = new Player("O", firstPlayerName);
const Player2 = new Player("X", secondPlayerName);

// Defining players score

document.querySelector(".scorePlayer1").innerText = (firstPlayerName + ": ");
document.querySelector(".scorePlayer2").innerText = (secondPlayerName + ": ");
let scorePlayer1 = 0;
let scorePlayer2 = 0;
// Initialize score 
document.querySelector(".numPlayer1").innerText = 0;
document.querySelector(".numPlayer2").innerText = 0;

// Reset scores when the button is presed

function resetScore() {
	document.querySelector(".numPlayer1").innerText = 0;
	document.querySelector(".numPlayer2").innerText = 0;
	scorePlayer1 = 0;
	scorePlayer2 = 0;
}

// starting the game + reset the grid

startGame();

function startGame() {
 document.querySelector(".endgame").style.display = "none";
 origBoard = Array.from(Array(9).keys())
	for (var i = 0; i < cells.length; i++){
	 cells[i].innerText = '';
	 cells[i].style.removeProperty("background-color");
	 cells[i].addEventListener('click', turnClick, { once: true });
	}
};

// Defining which player is playing

function turnClick(square) {
	let x = countOfelm();
	turn(square.target.id, x);
}

// Count the number of element placed by each players

function countOfelm() {
	let currentPlayer = '';
	let oFiled = origBoard.reduce((a, e, i) =>
		(e === Player1.mark) ? a.concat(i) : a, []);
	let xFiled = origBoard.reduce((a, e, i) =>
		(e === Player2.mark) ? a.concat(i) : a, []);
	let numberOFO = oFiled["length"];
	let numberOFX = xFiled["length"];	
	if (numberOFO > numberOFX) { 	// Changing player turns
		currentPlayer = Player2.mark;
		return currentPlayer;
	} else if (numberOFO === numberOFX){
		currentPlayer = Player1.mark;
		return currentPlayer;
	}
	
}

// Drawing the right symbol acording to the player turn

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	document.getElementById(squareId).style.color = player == Player1.mark ? "white" : "#d93a2c";
	countOfelm();
	let gameWon = checkWin(origBoard, player);
	let gameDraw = checkDraw();
	if(gameWon) gameEnd(gameWon);
}

// Check if somebody win

function checkWin (origBoard, player) {
	let plays = origBoard.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winConditions.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player}
			break;
		}
	}
	console.log(gameWon);
	return gameWon;
}

// Check if the game is a draw

function checkDraw() {
	let gameDraw = null;
	let oFiled = origBoard.reduce((a, e, i) =>
		(e === Player1.mark) ? a.concat(i) : a, []);
	let xFiled = origBoard.reduce((a, e, i) =>
		(e === Player2.mark) ? a.concat(i) : a, []);
	let allPlays = oFiled.concat(xFiled);		// If every cell is full  => Draww 
	let numberOfTurnPlayed = allPlays.length;
	if (numberOfTurnPlayed === 9) {
		document.querySelector(".endgame").style.display = "block";
		endGameMessage.innerText = "C'est une égalité !"
		}
}

// End Game , Reset the grid and display the winner

function gameEnd(gameWon) {
	// Highlight all mark that makes the player win
	for (let index of winConditions[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
		gameWon.player == Player1.mark ? "rgba(255, 255, 255, 0.5)" : "rgba(217, 58, 44, 0.5)"; 
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false)
	}
	document.querySelector(".endgame").style.display = "block";
	// Display Winner's name on the page
	if ((Player1.name === null || Player1.name === "") && (Player2.name === null || Player2.name === "")) {
		endGameMessage.innerText = gameWon.player == Player1.mark ? "Le Joueur 1 a gagné!" : "Le Joueur 2 a gagné!";
	} else if (Player1.name === null || Player1.name === "") {
		endGameMessage.innerText = gameWon.player == Player1.mark ? "Le Joueur 1 a gagné!" : (secondPlayerName + " a gagné!");		
	}else if (Player2.name === null || Player2.name === "") {
		endGameMessage.innerText = gameWon.player == Player1.mark ? (firstPlayerName + " a gagné!") : "Le Joueur 2 a gagné!";
	}else {
		endGameMessage.innerText = gameWon.player == Player1.mark ? (firstPlayerName + " a gagné!") : (secondPlayerName + " a gagné!");	
	}
	// Adding score to the player who just won 
	if (gameWon.player === "O") {
		scorePlayer1 ++;
		document.querySelector(".numPlayer1").innerText = scorePlayer1;
	} else if (gameWon.player === "X") {
		scorePlayer2 ++;
		document.querySelector(".numPlayer2").innerText = scorePlayer2;
	}
}


