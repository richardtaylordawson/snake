let playerX = 10;
let playerY = 10;
const gridSize = 15;
const tileCount = 15;
let appleX = 15;
let appleY = 15;
let xVelocity = 0;
let yVelocity = 0;
const trail = [];
let tail = 5;
let bool = true;
let coinMessageInterval;
const gameboard = document.getElementById('gameboard');
const ctx = gameboard.getContext('2d');

function setupGameMonitor() {
    // Monitor Border
    ctx.fillStyle = 'darkgrey';
    ctx.fillRect(0, 0, gameboard.width + 50, 450);

    // Monitor Shading
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(5, 5, gameboard.width - 5, 5);
    ctx.fillRect(5, 5, 5, 445);
    ctx.fillStyle = 'grey';
    ctx.fillRect(5, 445, gameboard.width - 5, 5);
    ctx.fillRect(595, 5, 5, 445);

    // Back Monitor Screen
    ctx.fillStyle = 'black';
    ctx.fillRect(25, 25, gameboard.width - 50, 400);

    // Monitor Stand
    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(200, 450, 200, 60);
    ctx.fillStyle = 'darkgrey';
    ctx.fillRect(50, 500, 500, 25);

    // Monitor Stand Shading
    ctx.fillStyle = '#999999';
    ctx.fillRect(50, 525, 500, 5);
}

function startGameLogic() {
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

function startGame() {
    clearInterval(coinMessageInterval);
    setupGameMonitor();
    setInterval(startGameLogic, 1000 / 15);
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
    // Space Bar
    case 32:
        startGame();
        break;
    default:
        break;
    }
}

function setupLeaderboardAndCoinMessage() {
    // Text Styling
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#aaaaaa';
    ctx.textAlign = 'center';

    // Display Fake Leaderboard
    ctx.fillText('Leaderboard', 300, 100);
    ctx.fillText('1. Captain America   -   1500', 300, 150);
    ctx.fillText('2. Iron Man  -   750', 300, 175);
    ctx.fillText('3. Thor   -   500', 300, 200);
    ctx.fillText('4. Ant Man  -   250', 300, 225);
    ctx.fillText('5. Thanos   -   100', 300, 250);

    // Flash a blinking message to press spacebar to play
    if (bool) {
        ctx.fillStyle = 'lime';
        ctx.fillText('Press space bar to play', 300, 350);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillText('Press space bar to play', 300, 350);
    }

    // Change bool to flash message next time around
    bool = !bool;
}

// Setup game monitor and flashing coin message onload
window.onload = () => {
    setupGameMonitor();
    coinMessageInterval = setInterval(setupLeaderboardAndCoinMessage, 1000);
};

// Add listener for user keydown arrow keys
document.addEventListener('keydown', keyPush);
