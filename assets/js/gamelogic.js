let playerX;
let playerY;
let playerScore = 0;
const gridSize = 20;
const tileCountX = 28;
const tileCountY = 20;
let appleX;
let appleY;
let xVelocity;
let yVelocity;
let trail;
let tail;
let bool = true;
let coinMessageInterval;
let startGameLogicInterval;
let currentDirection;
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
    ctx.fillRect(605, 5, 5, 445);

    // Back Monitor Screen
    ctx.fillStyle = 'black';
    ctx.fillRect(25, 25, 560, 400);

    // Monitor Stand
    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(215, 450, 200, 60);
    ctx.fillStyle = 'darkgrey';
    ctx.fillRect(62.5, 500, 500, 25);

    // Monitor Stand Shading
    ctx.fillStyle = '#999999';
    ctx.fillRect(62.5, 525, 500, 5);
}

function setupLeaderboardAndCoinMessage() {
    // Text Styling
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#aaaaaa';
    ctx.textAlign = 'center';

    // Display Fake Leaderboard
    ctx.fillText('Leaderboard', 312.5, 100);
    ctx.fillText('1. Captain America   -   1500', 312.5, 150);
    ctx.fillText('2. Iron Man  -   750', 312.5, 175);
    ctx.fillText('3. Thor   -   500', 312.5, 200);
    ctx.fillText('4. Ant Man  -   250', 312.5, 225);
    ctx.fillText('5. Thanos   -   100', 312.5, 250);

    // Flash a blinking message to press spacebar to play
    if (bool) {
        ctx.fillStyle = 'lime';
        ctx.fillText('Press space bar to play', 312.5, 350);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillText('Press space bar to play', 312.5, 350);
    }

    // Change bool to flash message next time around
    bool = !bool;
}

function setupGame() {
    // Game Defaults
    playerX = 10;
    playerY = 10;
    playerScore = 0;
    appleX = 14;
    appleY = 10;
    xVelocity = 0;
    yVelocity = 0;
    trail = [];
    tail = 5;

    // Setup Game monitor and coin message/leaderboard
    setupGameMonitor();
    // TODO Loading Icon Here
    coinMessageInterval = setInterval(setupLeaderboardAndCoinMessage, 1000);
}

function endGame() {
    clearInterval(startGameLogicInterval);
    const tempScore = playerScore;
    setupGame();
    alert(`Game over. Your score was ${tempScore}`);
}

function startGameLogic() {
    // Up the X & Y velocity
    playerX += xVelocity;
    playerY += yVelocity;

    // Check if the player hit a wall and end the game
    if (playerX <= -2 || playerY <= -2 || playerX > 28 || playerY > 20) {
        endGame();
    }

    // Display the black monitor again
    setupGameMonitor();

    // Color the snake green
    ctx.fillStyle = 'lime';
    for (let i = 0; i < trail.length; i += 1) {
        ctx.fillRect(trail[i].x * gridSize + 26, trail[i].y * gridSize + 26, gridSize - 2, gridSize - 2);
        if (trail[i].x === playerX && trail[i].y === playerY) {
            tail = 5;
        }
    }

    trail.push({ x: playerX, y: playerY });

    while (trail.length > tail) {
        trail.shift();
    }

    if (appleX === playerX && appleY === playerY) {
        playerScore = (tail - 5) * 5;
        tail += 1;
        appleX = Math.floor(Math.random() * tileCountX);
        appleY = Math.floor(Math.random() * tileCountY);
    }

    // Place the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * gridSize + 26, appleY * gridSize + 26, gridSize - 2, gridSize - 2);
}

function startGame() {
    clearInterval(coinMessageInterval);
    startGameLogicInterval = setInterval(startGameLogic, 1000 / 15);
}

function keyPush(event) {
    // Check if the user is trying to go the opposite direction and don't allow it
    if ((currentDirection === 'west' && event.keyCode === 39) ||
        (currentDirection === 'north' && event.keyCode === 40) ||
        (currentDirection === 'east' && event.keyCode === 37) ||
        (currentDirection === 'west' && event.keyCode === 38)) {
        return;
    }

    switch (event.keyCode) {
    // Left Arrow
    case 37:
        xVelocity = -1;
        yVelocity = 0;
        currentDirection = 'west';
        break;
    // Up Arrow
    case 38:
        xVelocity = 0;
        yVelocity = -1;
        currentDirection = 'north';
        break;
    // Right Arrow
    case 39:
        xVelocity = 1;
        yVelocity = 0;
        currentDirection = 'east';
        break;
    // Down Arrow
    case 40:
        xVelocity = 0;
        yVelocity = 1;
        currentDirection = 'south';
        break;
    // Space Bar
    case 32:
        startGame();
        break;
    default:
        break;
    }
}

// Setup game monitor and flashing coin message onload
window.onload = () => {
    setupGame();
};

// Add listener for user keydown arrow keys
document.addEventListener('keydown', keyPush);
