// ==========================================
// SECTION: INITIALIZATION
// ==========================================

let snakeCanvas = document.getElementById("snakeBoard");
let lifeCanvas = document.getElementById("lifeBoard");
let elScore = document.getElementById("score");
let elSpeed = document.getElementById("speed");
let elLevel = document.getElementById("level");

let snakeCtx = snakeCanvas.getContext("2d");
let lifeCtx = lifeCanvas.getContext("2d");

let snakeInterval;

const CANVAS_SIZE = snakeCtx.canvas.width;
const CELL_SIZE = CANVAS_SIZE / 20;
const REDRAW_INTERVAL = 20;
const MAP_SPRITE = "./assets/images/ground.png";
const APPLE_SPRITE = "./assets/images/apple.png";
const HEART_SPRITE = "./assets/images/heart.gif";
const LIFE_SPRITE = "./assets/images/heart-red.png";
const HEAD_SPRITE = "./assets/images/kepala.png";
const BODY_SPRITE = "./assets/images/badan.png";
const OBSTACLE_SPRITE = "./assets/images/obstacles/rectangle 20.png";

const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
};

// ==========================================
// SECTION: HELPER FUNCTIONS
// ==========================================

function clearCanvas() {
    snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function clearLifeCanvas() {
    lifeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function isPrimeNumber(num) {
    for (var i = 2; i <= Math.floor(num / 2); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function initPosition() {
    return Math.floor(Math.random() * (CANVAS_SIZE / CELL_SIZE)) * CELL_SIZE;
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function playSound(src) {
    const audio = new Audio();
    audio.src = src;
    audio.play();
}

function getImage(src) {
    let img = new Image();
    img.src = src;
    return img;
}

// ==========================================
// SECTION: OBJECTS
// ==========================================

const GAME = {
    score: {
        value: 0,
    },
    level: {
        value: 1,
    },
};

const SNAKE = {
    color: "orange",
    direction: initDirection(),
    speed: 100,
    ...initHeadBody(),
};

const HEART = {
    show: false,
    position: {
        x: initPosition(),
        y: initPosition(),
    },
};

const LEVEL = {
    1: {
        speed: SNAKE.speed,
        obstacles: [
            { x: 9 * CELL_SIZE, y: 10 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 10 * CELL_SIZE },
            { x: 11 * CELL_SIZE, y: 10 * CELL_SIZE },
        ],
    },
    2: {
        speed: SNAKE.speed - 15,
        obstacles: [
            //obstacle1
            { x: 0 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 1 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 2 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 3 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 4 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 5 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 6 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 7 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 8 * CELL_SIZE, y: 6 * CELL_SIZE },
            { x: 9 * CELL_SIZE, y: 6 * CELL_SIZE },
            //obstacle2
            { x: 19 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 18 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 17 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 16 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 15 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 14 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 13 * CELL_SIZE, y: 11 * CELL_SIZE },
            { x: 12 * CELL_SIZE, y: 11 * CELL_SIZE },
        ],
    },
    3: {
        speed: SNAKE.speed - 20,
        obstacles: [
            //obstacle1
            //obstacle1
            { x: 6 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 7 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 8 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 9 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 11 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 12 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 13 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 14 * CELL_SIZE, y: 7 * CELL_SIZE },
            //obstacle2
            { x: 9 * CELL_SIZE, y: 10 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 10 * CELL_SIZE },
            { x: 11 * CELL_SIZE, y: 10 * CELL_SIZE },
            //obstacle3
            { x: 6 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 7 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 8 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 9 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 11 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 12 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 13 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 14 * CELL_SIZE, y: 13 * CELL_SIZE },
        ],
    },
    4: {
        speed: SNAKE.speed - 35,
        obstacles: [
            //obstacle1
            { x: 0 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 1 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 2 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 3 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 4 * CELL_SIZE, y: 4 * CELL_SIZE },
            //obstacle2
            { x: 9 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 11 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 12 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 13 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 14 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 15 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 16 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 17 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 18 * CELL_SIZE, y: 7 * CELL_SIZE },
            { x: 19 * CELL_SIZE, y: 7 * CELL_SIZE },
            //obstacle3
            { x: 0 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 1 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 2 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 3 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 4 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 5 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 6 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 7 * CELL_SIZE, y: 12 * CELL_SIZE },
            //obsacle4
            { x: 19 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 18 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 17 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 16 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 15 * CELL_SIZE, y: 12 * CELL_SIZE },
            { x: 14 * CELL_SIZE, y: 12 * CELL_SIZE },
        ],
    },
    5: {
        speed: SNAKE.speed - 50,
        obstacles: [
            //obstacle1
            { x: 0 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 1 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 2 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 3 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 4 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 5 * CELL_SIZE, y: 4 * CELL_SIZE },
            { x: 6 * CELL_SIZE, y: 4 * CELL_SIZE },
            //obstacle2
            { x: 15 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 16 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 17 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 18 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 19 * CELL_SIZE, y: 8 * CELL_SIZE },
            //obstacle3
            { x: 4 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 5 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 6 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 7 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 8 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 9 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 8 * CELL_SIZE },
            { x: 11 * CELL_SIZE, y: 8 * CELL_SIZE },
            //obstacle4
            { x: 13 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 14 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 15 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 16 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 17 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 18 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 19 * CELL_SIZE, y: 13 * CELL_SIZE },
            //obstacle5
            { x: 0 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 1 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 2 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 3 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 4 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 5 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 6 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 7 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 8 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 9 * CELL_SIZE, y: 13 * CELL_SIZE },
            { x: 10 * CELL_SIZE, y: 13 * CELL_SIZE },
        ],
    },
};

const LIFE = {
    value: 3,
    container: {
        position: {
            x: 10,
            y: 10,
        },
    },
};

const APPLE = [
    {
        position: {
            x: initPosition(),
            y: initPosition(),
        },
    },
    {
        position: {
            x: initPosition(),
            y: initPosition(),
        },
    },
];

function initHeadBody() {
    const head = {
        position: {
            x: initPosition(),
            y: initPosition(),
        },
    };

    const body = [
        {
            position: {
                x: head.position.x,
                y: head.position.y,
            },
        },
    ];

    return {
        head: head,
        body: body,
    };
}

// ==========================================
// SECTION: DRAW FUNCTIONS
// ==========================================

function isSpriteOverlapping(sprite) {}

function drawApple() {
    APPLE.forEach((apple) =>
        snakeCtx.drawImage(getImage(APPLE_SPRITE), apple.position.x, apple.position.y, CELL_SIZE, CELL_SIZE)
    );
}

function drawHeart() {
    if (HEART.show) {
        snakeCtx.drawImage(getImage(HEART_SPRITE), HEART.position.x, HEART.position.y, CELL_SIZE, CELL_SIZE);
    }
}

function drawLife() {
    for (let i = 0; i < LIFE.value; i++) {
        const margin = i * 3;
        lifeCtx.drawImage(
            getImage(LIFE_SPRITE),
            LIFE.container.position.x + i * CELL_SIZE + margin,
            LIFE.container.position.y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawObstacle() {
    LEVEL[GAME.level.value].obstacles.forEach((obstacle) =>
        snakeCtx.drawImage(getImage(OBSTACLE_SPRITE), obstacle.x, obstacle.y, CELL_SIZE, CELL_SIZE)
    );
}

function drawSnake() {
    SNAKE.body.forEach((body, index) => {
        if (index > 0) {
            snakeCtx.drawImage(getImage(BODY_SPRITE), body.position.x, body.position.y, CELL_SIZE, CELL_SIZE);
        }
    });
    snakeCtx.drawImage(getImage(HEAD_SPRITE), SNAKE.head.position.x, SNAKE.head.position.y, CELL_SIZE, CELL_SIZE);
}

function drawScore() {
    elScore.innerHTML = GAME.score.value;
}

function drawSpeed() {
    elSpeed.innerHTML = LEVEL[GAME.level.value].speed + "ms";
}

function drawLevel() {
    elLevel.innerHTML = GAME.level.value;
}

function drawMap() {
    snakeCtx.drawImage(getImage(MAP_SPRITE), 0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

// ==========================================
// SECTION: GAMEPLAY
// ==========================================

function winTheGame() {
    playSound("./assets/audio/winning.mp3");
    setTimeout(() => {
        alert("CONGRATULATIONS, YOU WIN THE GAME!");
        window.location.reload();
    }, 100);
}

function gameOver() {
    playSound("./assets/audio/gameover.mp3");
    setTimeout(() => {
        alert("GAME OVER!");
        window.location.reload();
    }, 100);
}

function reAdjustSpeed() {
    SNAKE.speed = LEVEL[GAME.level.value].speed;
    clearInterval(snakeInterval);
    snakeInterval = setInterval(() => move(SNAKE.direction), SNAKE.speed);
}

function levelUp() {
    playSound("./assets/audio/nextlevel.mp3");
    GAME.level.value += 1;

    if (GAME.level.value === 3) LIFE.value += 3;
    if (GAME.level.value > 5) winTheGame();

    reAdjustSpeed();
}

function hitTheWall() {
    LEVEL[GAME.level.value].obstacles.forEach((obstacle) => {
        if (SNAKE.head.position.x == obstacle.x && SNAKE.head.position.y == obstacle.y) {
            LIFE.value -= 1;

            playSound("./assets/audio/obstacle.wav");

            SNAKE.head.position = {
                x: initPosition(),
                y: initPosition(),
            };

            SNAKE.body = [SNAKE.head];

            GAME.level.value = 1;
            SNAKE.speed = LEVEL[GAME.level.value].speed;

            if (LIFE.value < 0) {
                gameOver();
            }
        }
    });
}

function eatApple() {
    APPLE.forEach(function (apple, index) {
        if (SNAKE.head.position.x == apple.position.x && SNAKE.head.position.y == apple.position.y) {
            GAME.score.value += 1;

            if (GAME.score.value > 2 && isPrimeNumber(GAME.score.value)) {
                HEART.show = true;
            }

            if (GAME.score.value % 5 === 0) {
                levelUp();
            }

            playSound("./assets/audio/eat.mp3");

            APPLE[index].position.x = initPosition();
            APPLE[index].position.y = initPosition();

            SNAKE.body.push({
                sprite: BODY_SPRITE,
                position: {
                    x: SNAKE.head.position.x,
                    y: SNAKE.head.position.y,
                },
            });
        }
    });
}

function eatHeart() {
    if (HEART.show && SNAKE.head.position.x == HEART.position.x && SNAKE.head.position.y == HEART.position.y) {
        LIFE.value += 1;
        HEART.show = false;
        playSound("./assets/audio/life.wav");
        HEART.position.x = initPosition();
        HEART.position.y = initPosition();
    }
}

function teleport() {
    if (SNAKE.head.position.x < 0) {
        SNAKE.head.position.x = CANVAS_SIZE;
    } else if (SNAKE.head.position.x >= CANVAS_SIZE) {
        SNAKE.head.position.x = 0 - CELL_SIZE;
    } else if (SNAKE.head.position.y < 0) {
        SNAKE.head.position.y = CANVAS_SIZE;
    } else if (SNAKE.head.position.y >= CANVAS_SIZE) {
        SNAKE.head.position.y = 0 - CELL_SIZE;
    }
}

function move(direction) {
    teleport();
    eatApple();
    eatHeart();
    hitTheWall();
    reAdjustSpeed();

    switch (direction) {
        case DIRECTION.LEFT:
            SNAKE.direction = DIRECTION.LEFT;
            SNAKE.head.position.x -= CELL_SIZE;
            break;
        case DIRECTION.RIGHT:
            SNAKE.direction = DIRECTION.RIGHT;
            SNAKE.head.position.x += CELL_SIZE;
            break;
        case DIRECTION.DOWN:
            SNAKE.direction = DIRECTION.DOWN;
            SNAKE.head.position.y += CELL_SIZE;
            break;
        case DIRECTION.UP:
            SNAKE.direction = DIRECTION.UP;
            SNAKE.head.position.y -= CELL_SIZE;
            break;
    }

    moveBody();
}

function moveBody() {
    SNAKE.body.unshift({ position: { x: SNAKE.head.position.x, y: SNAKE.head.position.y } });
    SNAKE.body.pop();
}

function startGame() {
    setInterval(function () {
        clearLifeCanvas();
        clearCanvas();
        drawMap();
        drawObstacle();
        drawScore();
        drawSpeed();
        drawLevel();
        drawLife();
        drawSnake();
        drawApple();
        drawHeart();
    }, REDRAW_INTERVAL);

    snakeInterval = setInterval(() => move(SNAKE.direction), SNAKE.speed);

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            if (SNAKE.direction !== DIRECTION.RIGHT) {
                if (SNAKE.direction !== DIRECTION.LEFT) playSound("./assets/audio/left.mp3");
                move(DIRECTION.LEFT);
            }
        } else if (event.key === "ArrowRight") {
            if (SNAKE.direction !== DIRECTION.LEFT) {
                if (SNAKE.direction !== DIRECTION.RIGHT) playSound("./assets/audio/right.mp3");
                move(DIRECTION.RIGHT);
            }
        } else if (event.key === "ArrowUp") {
            if (SNAKE.direction !== DIRECTION.DOWN) {
                if (SNAKE.direction !== DIRECTION.UP) playSound("./assets/audio/down.mp3");
                move(DIRECTION.UP);
            }
        } else if (event.key === "ArrowDown") {
            if (SNAKE.direction !== DIRECTION.UP) {
                if (SNAKE.direction !== DIRECTION.DOWN) playSound("./assets/audio/down.mp3");
                move(DIRECTION.DOWN);
            }
        }
    });
}

// ==========================================
// SECTION: START MENU
// ==========================================

function startMenu() {
    snakeCtx.font = "24px Lalezar";
    snakeCtx.textAlign = "center";
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    snakeCtx.font = "18px Fredoka";
    snakeCtx.textAlign = "center";
    snakeCtx.fillText("-- Press any key to continue --", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);

    document.addEventListener("keydown", () => startGame());
}

// ==========================================
// SECTION: INITIATION
// ==========================================

function initialize() {
    startGame();
}
