
// declare global variables
var gameOver = false, gameStarted = false, gameTriggered = false;
var numMovesToFinish = 15;
var numMovesChicken = 0, numMovesEgg = 0;
var screenWidth;
var moveRightPixels;
var finishLine;
var countDown;
var intervalID;

// set up the listener to run the code when the document is ready
$(document).ready(function() {

  // set up various event listeners
  $("body").on("keypress", moveCharacter)   // when a keypress is clicked anywhere within the body, move the character
  $(".start").on("click", startGame)        // when the start button is clicked, start the game
  $(".reset").on("click", resetGame)        // when the reset button is clicked, reset the game
  $(window).on("resize", recalcMoves)       // when the window is resized, re-calculate the distance that each character will move based on the new screen size

  // calculate / init the move distance and finish line position
  recalcMoves();

  // function to determine how many pixels the characters will move to the right, based on the current window size
  function recalcMoves() {
    screenWidth = $(window).width();
    moveRightPixels = Math.floor((screenWidth - 350) / numMovesToFinish);
    finishLine = screenWidth - 400;
  }

  // function to move the characters
  function moveCharacter(el) {

    // get the ascii character code of the key that was pressed
    var keyPressed = el.charCode;

    // don't do anything if the game is over
    if (!gameOver) {

      // ignore the keypresses if the game hasn't started yet (need to wait for 'Go!')
      if (!gameStarted && (keyPressed === 113 || keyPressed === 122)) {

        // if the game hasn't been triggered yet, alert the user they need to hit the start button first
        if (!gameTriggered && (keyPressed === 113 || keyPressed === 122)) {
          $("h2.winner").css("color","grey");
          $("h2.winner").text("Hit the start button to start the race!");
        }

      // if the game has been triggered and started (Go), continue..
      } else {

        // move the chicken if the 'c' key was pressed, and move the egg if the 'e' key was pressed
        // animate the move using 0.2 seconds
        if (Math.max(numMovesChicken, numMovesEgg) < numMovesToFinish) {
          if (keyPressed === 113) {
            $(".chicken").animate({left: "+=" + moveRightPixels}, 200);
            numMovesChicken++
          } else if (keyPressed === 122) {
            $(".egg").animate({left: "+=" + moveRightPixels}, 200);
            numMovesEgg++
          }
        }

        // get the current position of the chicken and egg (left side)
        var posChicken = $(".chicken").position().left;
        var posEgg = $(".egg").position().left;

        // testing
        // console.log(`chicken has moved ${numMovesChicken} spaces, egg has moved ${numMovesEgg} spaces`);

        // check for winner!
        // if either the chicken or the egg has crossed the finish line
        // display the winner and set/reset variables indicating that the game is over
        if (Math.max(posChicken, posEgg) >= finishLine) {
          if (numMovesChicken === numMovesToFinish) {
            $("h2.winner").text("Chicken wins!");
          } else {
            $("h2.winner").text("Egg wins!");
          }
          $("h2.winner").css("color","grey");
          gameOver = true;
          gameStarted = false;
        }

      }

    }

  }


  // function to reset the game
  function resetGame(el) {
    // hide the winner display by setting full transparency
    $("h2.winner").css("color","rgba(26,127,0,0)");
    // move the chicken and egg characters back to their original starting position
    $(".chicken").css("left", 0);
    $(".egg").css("left", 0);
    // reset variables
    gameOver = false;
    gameStarted = false;
    gameTriggered = false;
    numMovesChicken = 0;
    numMovesEgg = 0;
  }

  // function to start the game
  function startGame(el) {
    // if the game has not been triggered yet, don't do anything
    if (!gameTriggered) {
      // set a timer to execute the countDownToStart every 800 milliseconds
      intervalID = window.setInterval(countDownToStart, 800);
      // initialize the countdown to 1 and flip game triggered to true
      countDown = 1;
      gameTriggered = true;
      // display the first countdown text - On Your Mark
      $("h2.winner").css("color","grey");
      $("h2.winner").text("On Your Mark");
      // move the chicken and egg pixels
      $(".chicken").animate({left: "+=50"}, 200);
      $(".egg").animate({left: "+=50"}, 200);
    }
  }

  // function to count down to the start of the race
  function countDownToStart() {
    // display the second countdown text - Get Set
    if (countDown === 1) {
      $("h2.winner").text("Get Set");
    // display the third and final countdown text - Go!
    // flip the boolean game started variable to true
    } else if (countDown === 2) {
      $("h2.winner").css("color","rgba(26,127,0,1)");
      $("h2.winner").text("Go!");
      gameStarted = true;
    }
    // increment the count down variable
    countDown++;
    // when the count down is complete, clear the timer so that the function will cease to be fired
    if (countDown === 3) {
      clearInterval(intervalID);
    }
  }



})
