// basic variables

let origBoard;
const Player1 = 'O';
const Player2 = 'X';
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
		(e === Player1) ? a.concat(i) : a, []);
	let xFiled = origBoard.reduce((a, e, i) =>
		(e === Player2) ? a.concat(i) : a, []);
	let numberOFO = oFiled["length"];
	let numberOFX = xFiled["length"];	
	if (numberOFO > numberOFX) { 	// Changing player turns
		currentPlayer = Player2;
		return currentPlayer;
	} else if (numberOFO === numberOFX){
		currentPlayer = Player1;
		return currentPlayer;
	}
	
}

// Drawing the right symbol acording to the player turn

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	document.getElementById(squareId).style.color = player == Player1 ? "white" : "#d93a2c";
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
	return gameWon;
}

// Check if the game is a draw

function checkDraw() {
	let gameDraw = null;
	let oFiled = origBoard.reduce((a, e, i) =>
		(e === Player1) ? a.concat(i) : a, []);
	let xFiled = origBoard.reduce((a, e, i) =>
		(e === Player2) ? a.concat(i) : a, []);
	let allPlays = oFiled.concat(xFiled);		// If every cell is full  => Draww 
	let numberOfTurnPlayed = allPlays.length;
	if (numberOfTurnPlayed === 9) {
		document.querySelector(".endgame").style.display = "block";
		endGameMessage.innerText = "C'est une égalité !"
		}
}

// End Game , Reset the grid and display the winner

function gameEnd(gameWon) {
	for (let index of winConditions[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
		gameWon.player == Player1 ? "rgba(255, 255, 255, 0.5)" : "rgba(217, 58, 44, 0.5)"; //rgba(39, 76, 89, 0.5)
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false)
	}
	document.querySelector(".endgame").style.display = "block";
	endGameMessage.innerText = gameWon.player == Player1 ? "Les O ont gagné!" : "Les X ont gagné!";
}


