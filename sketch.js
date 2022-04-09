//Canvas parameters
let width = 660;
let height = 500;

//Ball parameters
let xBall = 325;
let yBall = Math.floor(Math.random() * (height) )
let ballDiameter = 12;
let radius = ballDiameter / 2;

//Ball directions
let xBallDirection = 5.5;
let yBallDirection = 5.5;

//Rectangle parameters
let xRect1 = 5;
let yRect1 = 245;
let xRect1Length = 10;
let yRect1Length = 70;
let xRect2Length = 10;
let yRect2Length = 70;
//Remember, the length of the rect always go to the left...
let xRect2 = width - xRect2Length - xRect1;
let yRect2 = 245;
let yRect1Speed = 5;
let yRect2Speed = 5;

//Score parameters
let myScore = 0;
let AIScore = 0;

//Sound variables
let strike;
let score;

//Colision parameters
let hitRects = false;

function moveBall() {
  
  xBall += xBallDirection
  yBall += yBallDirection
  
}

function checkBallBorder() {
  //Its ball + radius because the location of "ball" is on its own center, so its half enters the border. To solve this issue, we put + radius
  if (xBall + radius > width || xBall - radius < 0) {
    xBallDirection *= -1;
  }
  if (yBall + radius > height || yBall - radius < 0) {
    yBallDirection *= -1;
  }
}

function moveRect() {
  if (keyIsDown(87)) {
    yRect1 -= yRect1Speed;
  }
  if (keyIsDown(83)) {
    yRect1 += yRect1Speed;
  }
}

function rect2AI() {
  if (yBall + radius < yRect2 ) {
    yRect2 -= yRect2Speed;
  }
  if (yBall - radius > yRect2) {
    yRect2 += yRect2Speed
  }
}

function collision() {
  //The reason to add 20 and -40 to the lengths is to fix a bug when the ball gets stuck in the rectangle
  hitRects = collideRectCircle(xRect1, yRect1, xRect1Length, yRect1Length, xBall, yBall, radius) || collideRectCircle(xRect2, yRect2, xRect2Length, yRect2Length, xBall, yBall, radius)
  if (hitRects) {
    xBallDirection *= -1
    strike.play();
  }
}

function scoreHall() {
  fill(255)
  textSize(20);
  textAlign(CENTER)
  text(myScore, width / 2 - 30, 50);
  text(AIScore, width / 2 + 30, 50);
}

function checkRectBorder() {
 // Here >= is used because sometimes the rectangle will surpass the height in a "jump", so it won't pass trought it
  if (yRect1 == 0) {
    yRect1 += yRect1Speed;
  }
  if (yRect1 + yRect1Length == height) {
    yRect1 -= yRect1Speed;
  }
  if (yRect2 == 0) {
    yRect2 += yRect2Speed;
  }
  if (yRect2 + yRect2Length + 5 == height) {
    yRect2 -= yRect2Speed;
  }
}

function makeScore() {
  if (xBall - radius < 0) {
    AIScore += 1;
    score.play();
  }
  if (xBall + radius > width ) {
    myScore += 1;
    score.play();
  }
}

function preload() {
  strike = loadSound("raquetada.mp3")
  score = loadSound("ponto.mp3")
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  //Black background
  background(0);
  //Create a circle
  circle(xBall, yBall, ballDiameter);
  //Create a rectangle
  rect(xRect1, yRect1, xRect1Length, yRect1Length);
  rect(xRect2, yRect2, xRect2Length, yRect2Length);
  stroke(255)
  line(width / 2, 0, width / 2, height);
  
  moveBall();
  
  checkBallBorder();
  
  moveRect();
  
  collision();
  
  checkRectBorder();
  
  rect2AI();
  
  scoreHall();
  
  makeScore();
  
}