var buttonColours = ["red", "blue", "green", "yellow"];

var randomColourChosen;

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).on("keypress", function () {
  if(!started)
  {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswers(userClickedPattern.length-1);
});

function checkAnswers(currentLevel) {
  setTimeout(function() {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    }

      else{
      playSound("wrong");
      $("h1").text("You Lost!!!");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("h1").text("Game Over!!! Press A Key to Restart");
        $("body").removeClass("game-over");
        level = 0;
      }, 2000);
      startOver();
    }
  }, 500);
}


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomColourChosen = buttonColours[randomNumber];
  gamePattern.push(randomColourChosen);
  $("#" + randomColourChosen).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
    playSound(randomColourChosen);
  });
  level++;
  $("h1").text("Level " + level);
}



function playSound(source) {
  var fileSource = "sounds/" + source + ".mp3";
  var audio = new Audio(fileSource);
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
