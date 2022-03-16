// All the varibales and constants used in this snake game
const food = new Audio('/music/food.mp3');
const gameOver = new Audio('/music/gameover.mp3');
const move = new Audio('/music/move.mp3');
const music = new Audio('/music/music.mp3');
scoreCard = document.getElementById('scoreCard');
let hiScore = document.getElementById('hiScore');
let up = document.querySelector('.up')
let left = document.querySelector('.left')
let mid = document.querySelector('.mid')
let right = document.querySelector('.right')
let screenTime = 0;
let snakeArr = [
    { x: 12, y: 10 }
]
music.loop = true;
let foodItem = { x: 5, y: 6 };
let foodBox = [];
let moveInp = { x: 0, y: 0 };
let score = 0;
let speed = 0.2;
let snakeElement = []

function game(ctime) {
    // Game loop function called again and again for the game animation and continuous painting of screen
    window.requestAnimationFrame(game);
    if ((ctime - screenTime) / 1000 < speed) {
        return;
    }
    screenTime = ctime;
    gameSystem();
}

// Collide function used to detect the collision of snake
function isCollide() {
    // If snake touches the wall
    if (snakeArr[0].x > 18 || snakeArr[0].x <= 0 || snakeArr[0].y > 18 || snakeArr[0].y <= 0) {
        return true;
    }
    // If snake eats himself
    for (let j = 1; j < snakeArr.length; j++) {
        if (snakeArr[0].x == snakeArr[j].x && snakeArr[0].y == snakeArr[j].y) {
            return true;
        }
    }

}

// This section is used to show hi score on the screen stored in the localstorage of the browser
let maxScore = localStorage.getItem('maxScore');
let ScoreVal = 0;
if (maxScore == null) {
    ScoreVal = "0";
}
else {
    ScoreVal = maxScore;
}
localStorage.setItem('maxScore', ScoreVal);
hiScore.innerText = `Hi-Score: ${JSON.parse(ScoreVal)}`;

// Main game engine starts here
function gameSystem() {
    // This segment is used to display the food on the screen
    foodBox.push(document.createElement('div'));
    foodBox[0].classList.add('feed')
    foodBox[0].style.gridRowStart = foodItem.y
    foodBox[0].style.gridColumnStart = foodItem.x;
    board.appendChild(foodBox[0]);

    // This segment tells the operation after eating the food 
    if ((snakeArr[0].x === foodItem.x) && (snakeArr[0].y === foodItem.y)) {
        score += 1;
        speed -= 1 / 200;
        food.play();

        // Updation of score after eating the food
        scoreCard.innerText = `Score: ${score}`;

        // Updation of hi score when the player's score crosses the hi score
        if (score > ScoreVal) {
            ScoreVal = score;
            localStorage.setItem('maxScore', JSON.stringify(ScoreVal))
            hiScore.innerText = `Hi-Score: ${(ScoreVal)}`;
        }

        // Increment of snake's length after having the food
        snakeArr.unshift({ x: snakeArr[0].x + moveInp.x, y: snakeArr[0].y + moveInp.y });

        // Updation of food to the new place
        let a = 2;
        let b = 16;
        foodBox.splice(1, foodBox.length)
        foodItem = {
            x: parseInt(a + (b - a) * Math.random()), y: parseInt(a + (b - a) * Math.random())
        }
    }


    // What will happen after collision?
    if (isCollide()) {
        moveInp = { x: 0, y: 0 };
        foodItem = { x: 5, y: 6 };
        location.reload(true);
        music.pause();
        gameOver.play();

        alert('Game Over! Press any Key to play Again');
        moveInp = { x: 0, y: 0 };
        foodItem = { x: 5, y: 6 };
        music.play();
    }

    // This segment is used to update and show the snake 
    snakeArr.forEach((e, index) => {
        snakeElement.push(document.createElement('div'));
        snakeElement[index].style.gridRowStart = e.y;
        snakeElement[index].style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement[index].classList.add('head');
        }
        else {
            snakeElement[index].classList.add('snake');
        }
        board.appendChild(snakeElement[index]);
    });

    // This segment is used to move the snake
    for (let i = snakeArr.length - 1; i >= 1; i--) {
        snakeArr[i] = { ...snakeArr[i - 1] };
    }
    snakeArr[0].x += moveInp.x;
    snakeArr[0].y += moveInp.y;
}


// Game loop animation request
window.requestAnimationFrame(game);
// Main logic starts here
window.addEventListener('keydown', e => {
    music.play();
    moveInp = { x: 0, y: -1 };
    move.play();

    switch (e.key) {
        case "ArrowUp":
            moveInp = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            moveInp = { x: 0, y: 1 }
            break;
        case "ArrowRight":
            moveInp = { x: 1, y: 0 }
            break;
        case "ArrowLeft":
            moveInp = { x: -1, y: 0 }
            break;
        default:
            break;
    }
})

// Game controls for mobile phones
up.addEventListener('click', () => {
    moveInp = { x: 0, y: -1 };
    move.play();
    music.play();
})
left.addEventListener('click', () => {
    moveInp = { x: -1, y: 0 };
    move.play();
    music.play();
})
mid.addEventListener('click', () => {
    moveInp = { x: 0, y: 1 };
    move.play();
    music.play();
})
right.addEventListener('click', () => {
    moveInp = { x: 1, y: 0 };
    move.play();
    music.play();
})




















