const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var highestScore = 0;

$(".startGame").click(function (e) {
  if (!started) {
    started = true;
    $(".display").addClass("pressedSimon");

    playSound("countdown");
    setTimeout(() => {
      $(".display").text("Game Start");
    }, 280);
    setTimeout(() => {
      nextSequence();
    }, 1500);
  }
});

$(".pad").click(function (e) {
  if (started) {
    var userChosenColour = e.target.id;
    userPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length - 1);
  }
});

function nextSequence() {
  userPattern = [];
  level++;
  $(".display").text(`Level  ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  gamePattern.forEach(function (colour, index) {
    setTimeout(function () {
      $("#" + colour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
      playSound(colour);
    }, (index + 1) * 500);
  });
}

// CheckAnswer
function checkAnswer(currentLev) {
  if (userPattern[currentLev] === gamePattern[currentLev]) {
    if (userPattern.length === gamePattern.length) {
      if (level > highestScore) {
        highestScore = level;
      }
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // failed
    playSound("wrong"); // play wrong sound
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
      $(".display").text("SIMON");
    }, 1000);
    $(".display").text("Game Over");
    $(".highest-score").text(`🥇 Highest score: ${highestScore}`);

    startOver(); //resets game
  }
}

function playSoundAll(patterns) {
  patterns.forEach((pattern, index) => {
    setTimeout(() => {
      var audio = new Audio(`./sounds/${pattern}.mp3`);
      audio.play();
    }, index * 1000);
  });
}

function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function copyEmail() {
  const email = "jiwonlee310@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      const copyButton = document.getElementById("copyButton");
      copyButton.innerHTML = "Email Copied!";
    })
    .catch((error) => {
      console.error("Failed to copy email:", error);
    });
}
