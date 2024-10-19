let dice = [];
let numberOfDice = 5;
let rollCount = 0;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numberOfDice; i++) {
    dice[i] = new Die(50); // argument is the size of the die
  }

  createP("Rules:");
  createP("1. Players will roll the dice by clicking or pressing a key.");
  createP("2. Frozen dice (selected by clicking on them) won't roll.");
  createP("3. Players get three chances to roll the dice and aim for the highest total score.");
  createP("4. After the third roll, the game ends, and the score is displayed.");

}

function draw() {
  background("darkolivegreen");

  // Check roll count and display score after 3 rolls
  if (rollCount >= 3) {
    displayScore();
    noLoop(); // Stop drawing after displaying score
    return;
  }

  // Loop over the array and place + display each die
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.place(die.size * 1.2 * i + die.size, die.size * 2);
    die.display();
  }
}

function mouseClicked() {
  // Loop over the array of dice to handle freezing/unfreezing
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    if (die.isTouched(mouseX, mouseY)) {
      die.toggleFreeze();
    }
  }
}

function keyPressed() {
  if (rollCount < 3) { // Only allow rolling if less than 3 times
    shakeDice();
    rollCount++;
  }
}

function shakeDice() {
  let list = "values: ";
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.roll();
    list = list + die.value + " ";
  }
  console.log(list);
}

function displayScore() {
  let totalScore = 0;
  for (let i = 0; i < dice.length; i++) {
    totalScore += dice[i].value;
  }
  textSize(32);
  fill(0);
  text("Game Over! Your Score: " + totalScore, width / 2, height / 2);
}