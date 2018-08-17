let playerX = 10;
let playerY = 10;
let gridSize = 20;
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

    // Make the entire gameboard black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameboard.width, gameboard.height);

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

// Call the game every 50 milliseconds (20 times every second)
setInterval(game, 1000 / 15);

document.addEventListener('keydown', keyPush);
