//TODO Create a class for the snake instead of the gamelogic file
class Snake {
    constructor() {
        let playerX;
        let playerY;
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
        let gameIsStarted = false;
        let coinMessageInterval;
        let startGameLogicInterval;
        let currentDirection;
        let drawNextImageInterval;
        let imageName;
        const gameboard = document.getElementById('gameboard');
        const ctx = gameboard.getContext('2d');
    }
}
