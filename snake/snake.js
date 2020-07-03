const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// load every images

const background = new Image();
background.src = "img/background.png";

const foodImage = new Image();
foodImage.src = "img/food.png";

const snakeHead = new Image();
snakeHead.src = "img/snake_head.png";

const snakeBody = new Image();
snakeBody.src = "img/snake_body.png";

// defining the unit of the game because each box is 32px 

let unit = 32;

// defining the snake

let snake = [];
snake[0] = {
	x : 12*unit,
	y : 10*unit
}
 // old head position

let snakeX = snake[0].x ;
let snakeY = snake[0].y ;

// defining the snake

let food = {
	x : Math.floor(Math.random()*17+1) *unit,
	y : Math.floor(Math.random()*15+3) *unit
}

// defining score

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if ( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if (key == 38 && d != "DOWN"){
        d = "UP";
    }else if (key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if (key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function drawImageRot(img,x,y,width,height,deg){
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var degree = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(degree);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    // Restore canvas state as saved from above
    ctx.restore();
}

// cheack collision function

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// call the draw function every 100ms

let loop = setInterval(draw,100);

// draw everything on the "snake" canvas

function draw() {
	ctx.drawImage(background,0,0);
	for (var i = 0; i < snake.length; i++) {
		if (i == 0) {
			// ctx.fillStyle = ctx.drawImage(snakeHead,snake[i].x,snake[i].y);
			ctx.fillStyle = drawImageRot(snakeHead, snake[0].x, snake[0].y, unit, unit, 0);
		} else {
			ctx.fillStyle = ctx.drawImage(snakeBody, snake[i].x, snake[i].y);
		}
	}

	ctx.drawImage(foodImage,food.x,food.y);
    // which direction

    if ( d == "LEFT") {
    	snakeX -= unit;
    }
    if ( d == "UP") {
    	snakeY -= unit;
    	// rotate the head 90 deg clockwise
    	ctx.clearRect(snakeX, (snakeY + unit), unit, unit);
    	drawImageRot(snakeHead, snakeX, (snakeY + unit), unit, unit, 90);
    }
    if ( d == "RIGHT") {
    	snakeX += unit;
    	// rotate the head 180 deg clockwise
    	ctx.clearRect((snakeX - unit), snakeY, unit, unit);
    	drawImageRot(snakeHead, (snakeX - unit), snakeY, unit, unit, 180);
    }
    if ( d == "DOWN") {
    	snakeY += unit;
    	// rotate the head 270 deg clockwise
    	ctx.clearRect(snakeX, (snakeY - unit), unit, unit);
    	drawImageRot(snakeHead, snakeX, (snakeY - unit), unit, unit, 270);	
    }

    // if the snake eats the food

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * unit,
            y : Math.floor(Math.random()*15+3) * unit
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over
    
    if (snakeX < unit || snakeX > 17 * unit || snakeY < 3*unit || snakeY > 17*unit || collision(newHead,snake)){
		clearInterval(loop);
		document.querySelector(".text").innerText = "You Lose !";
		document.querySelector(".endgame").style.display = "block";
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "2rem Verdana";
    ctx.fillText(score,2*unit,1.58*unit);
}

document.getElementById("restartButton").addEventListener("click", restartGame);

function restartGame() {
	document.querySelector(".endgame").style.display = "none";
	if ( d == "UP") {
    	ctx.clearRect(snake[0].x, (snake[0].y + unit), unit, unit);
    }
    snake = [];
    snakeX = 12*unit;
    snakeY = 10*unit;
    d = undefined;
	score = 0;
	food = {
            x : Math.floor(Math.random()*17+1) * unit,
            y : Math.floor(Math.random()*15+3) * unit
        }
	loop = setInterval(draw,100)
}