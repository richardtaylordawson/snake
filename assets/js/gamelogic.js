let playerX = 10;
let playerY = 10;
const gridSize = 20;
const tileCount = 20;
let appleX = 15;
let appleY = 15;
let xVelocity = 0;
let yVelocity = 0;
const trail = [];
let tail = 5;

const gameboard = document.getElementById('gameboard');
const ctx = gameboard.getContext('2d');

function game() {
    playerX += xVelocity;
    playerY += yVelocity;

    if (playerX < 0) {
        playerX = tileCount - 1;
    }
    if (playerX > tileCount - 1) {
        playerX = 0;
    }
    if (playerY < 0) {
        playerY = tileCount - 1;
    }
    if (playerY > tileCount - 1) {
        playerY = 0;
    }

    ctx.fillStyle = 'darkgrey';
    ctx.fillRect(0, 0, gameboard.width + 50, gameboard.height + 50);

    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(5, 5, gameboard.width - 5, 5);
    ctx.fillRect(5, 5, 5, gameboard.height - 5);

    ctx.fillStyle = 'grey';
    ctx.fillRect(5, 445, gameboard.width - 5, 5);
    ctx.fillRect(595, 5, 5, gameboard.height - 5);

    // Make the entire gameboard black
    ctx.fillStyle = 'black';
    ctx.fillRect(25, 25, gameboard.width - 50, gameboard.height - 50);

    // Color the snake green
    ctx.fillStyle = 'lime';
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x === playerX && trail[i].y === playerY) {
            tail = 5;
        }
    }

    trail.push({ x: playerX, y: playerY });

    while (trail.length > tail) {
        trail.shift();
    }

    if (appleX === playerX && appleY === playerY) {
        tail++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
    }
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);

    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);


}

function keyPush(event) {
    switch (event.keyCode) {
    // Left Arrow
    case 37:
        xVelocity = -1;
        yVelocity = 0;
        break;
    // Up Arrow
    case 38:
        xVelocity = 0;
        yVelocity = -1;
        break;
    // Right Arrow
    case 39:
        xVelocity = 1;
        yVelocity = 0;
        break;
    // Down Arrow
    case 40:
        xVelocity = 0;
        yVelocity = 1;
        break;
    default:
        break;
    }
}

let test = true;

function waitingForCoins() {

    if(test) {
        ctx.font = "20px Verdana";
        ctx.fillStyle = 'white';
        ctx.fillText("Waiting for coins. . .", 210, 200);
    } else {
        ctx.font = "20px Verdana";
        ctx.fillStyle = 'black';
        ctx.fillText("Waiting for coins. . .", 210, 200);
    }

    test = !test;
}


game();

setInterval(waitingForCoins, 1000);

// Add listener for user keydown arrow keys
document.addEventListener('keydown', keyPush);
