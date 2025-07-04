var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressable = true;

const greenSound = new Audio("./sounds/green.mp3");
greenSound.volume = 0.3;
const redSound = new Audio("./sounds/red.mp3");
redSound.volume = 0.3;
const yellowSound = new Audio("./sounds/yellow.mp3");
yellowSound.volume = 0.3;
const blueSound = new Audio("./sounds/blue.mp3");
blueSound.volume = 0.3;
const gameOverSound = new Audio("./sounds/wrong.mp3");
gameOverSound.volume = 0.1;

$(document).keydown(function (event) {
  if (level == 0 && event.originalEvent.key == "a") nextSequence();
});

$(".btn").on("click", function () {
  if(!pressable) return;
  userClickedPattern.push($(this).attr("id"));
  playSound(userClickedPattern.at(-1));
  playPressAnimation(userClickedPattern.at(-1));
  checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    // console.log("wrong");
    gameOverSound.play();
    $("h1").text("Game Over, Press A to Restart.");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    return;
  }

  // console.log("success");
  if (currentLevel + 1 == gamePattern.length) {
    pressable = false;
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

function nextSequence() {
  $("h1").text("Level " + ++level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  playAnimation(randomChosenColour);
  pressable = true;
}

function playSound(buttonColour) {
  switch (buttonColour) {
    case "green":
      greenSound.play();
      break;
    case "red":
      redSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
  }
}

function playAnimation(buttonColor) {
  $("#" + buttonColor)
    .animate({ opacity: 0.5 }, 200)
    .animate({ opacity: 1 }, 200);
}

function playPressAnimation(buttonColour) {
  $("#" + buttonColour).addClass("pressed");
  setTimeout(() => {
    $("#" + buttonColour).removeClass("pressed");
  }, 100);
}
