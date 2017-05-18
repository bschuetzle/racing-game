
var numMovesChicken = 0;
var numMovesEgg = 0;
var gameOver = false, gameStarted = false, gameTriggered = false;
var screenWidth;
var numMovesToFinish = 15;
var moveRightPixels;
var finishLine;
var countDown;
var intervalID;

$(document).ready(function() {

  console.log("Javascript file is linked!");



  // listen for keypress event, then trigger the moveCharacter function
  $("body").on("keypress", moveCharacter)

  // listen for the click event for the reset button, then trigger the resetGame function
  $(".reset").on("click", resetGame)

  // listen for the click event for the reset button, then trigger the resetGame function
  $(".start").on("click", startGame)

  $(window).on("resize", recalcMoves)

  recalcMoves();

  // get the current screen width, then calculate how many pixels we will move to the right with each keypress
  function recalcMoves() {
    screenWidth = $(window).width();
    console.log(`screen width is ${screenWidth}`);
    moveRightPixels = Math.floor((screenWidth - 350) / numMovesToFinish);
    console.log(`we will move right ${moveRightPixels} pixels every move`);
    finishLine = screenWidth - 400;
  }

  function moveCharacter(el) {

    //console.log(el);
    var keyPressed = el.charCode;
    //console.log(keyPressed);

    if (!gameOver) {

      // if the game hasn't started yet, ignore the keypresses
      if (!gameStarted && (keyPressed === 99 || keyPressed === 101)) {
        // if the game hasn't been triggered, alert the user they need to hit the start button
        if (!gameTriggered && (keyPressed === 99 || keyPressed === 101)) {
          $("h2.winner").css("color","black");
          $("h2.winner").text("Hit the start button to start the race!");
        }

      } else {



        if (keyPressed === 99) {
          //console.log("move chicken")
          numMovesChicken++;
          $(".chicken").animate({left: "+=" + moveRightPixels}, 200);
        } else if (keyPressed === 101) {
          //console.log("move egg");
          numMovesEgg++;
          $(".egg").animate({left: "+=" + moveRightPixels}, 200);
        }

        // get the left position of the chicken and egg
        var posChicken = $(".chicken").position().left;
        var posEgg = $(".egg").position().left;



        // check for winner
        if (numMovesChicken === numMovesToFinish && numMovesEgg === numMovesToFinish) {
          alert("it is a tie");
          gameOver = true;
          gameStarted = false;
        } else if (posChicken >= finishLine) {
          $("h2.winner").text("Chicken is the winner!");
          $("h2.winner").css("color","black");
          gameOver = true;
          gameStarted = false;
        } else if (posEgg >= finishLine) {
          $("h2.winner").text("Egg is the winner!");
          $("h2.winner").css("color","black");
          gameOver = true;
          gameStarted = false;
        }

      }

    }


  }

  function resetGame(el) {
    console.log("reset button clicked");
    $("h2.winner").css("color","rgba(26,127,0,0)");
    //$("h2.winner").text("---");
    $(".chicken").css("left", 0);
    $(".egg").css("left", 0);
    numMovesChicken = 0;
    numMovesEgg = 0;
    gameOver = false;
    gameStarted = false;
    gameTriggered = false;
  }

  function startGame(el) {

    // only execute this if the game has not been triggered
    if (!gameTriggered) {

      intervalID = window.setInterval(countDownToStart, 800);

      countDown = 1;

      $("h2.winner").css("color","rgba(26,127,0,1)");
      $("h2.winner").text("On Your Mark");

      $(".chicken").animate({left: "+=50"}, 200);
      $(".egg").animate({left: "+=50"}, 200);

      gameTriggered = true;

    }

  }

  function countDownToStart() {

    if (countDown === 1) {
      $("h2.winner").text("Get Set");
    } else if (countDown === 2) {
      $("h2.winner").text("Go!");
      gameStarted = true;
    }
    countDown++;
    if (countDown === 3) {
      clearInterval(intervalID);
    }
  }

})
