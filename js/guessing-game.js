/*
 */

function generateWinningNumber() {
  let winningNumber = Math.ceil(Math.random() * 100);
  return winningNumber;
}

//will need that function for a hint func
function shuffle(arr) {
  let length = arr.length;
  let randomNum, t;
  while (length) {
    randomNum = Math.floor(Math.random() * length--); //returns a random number from the arr
    //swap the two elements
    //  let currentElement = arr[length];
    t = arr[length];
    arr[length] = arr[randomNum]; //?????
    arr[randomNum] = t;
  }
  return `The answer is ${arr[0]}, ${arr[1]}, or ${arr[2]}`;
}
class Game {
  constructor() {
    //playersGuess property is what will hold the player's number guess
    this.playersGuess = null;
    //pastGuesses will be an array, and holds all of the player's past guesses
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    //returns the absolute value of the difference between the
    //playersGuess and winningNumbe
    return Math.abs(this.playersGuess - this.winningNumber);
    //the number is returned
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) return "Guess higher!";
    else return "Guess lower!";
  }
  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || isNaN(num)) {
      document.querySelector(".guesses_feedback").textContent =
        "That is an invalid guess.";
      throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    //returna the result returened from checkGuess func(which is a string )
    return this.checkGuess();
  }
  checkGuess() {
    let feedbackText = "";
    if (this.playersGuess === this.winningNumber) {
      feedbackText = "You Win!";
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedbackText = "You have already guessed that number.";
    }
    //if playersGuess isn't the winningNumber or a duplicate, add it to pastGuesses
    else if (
      this.playersGuess !== this.winningNumber ||
      !this.pastGuesses.includes(this.playersGuess)
    ) {
      this.pastGuesses.push(this.playersGuess);

      if (this.pastGuesses.length == 5) {
        //returns "You Lose" if this is the players 5th guess
        feedbackText = "You Lost:(";
        document.querySelector('#headers >h1').textContent = 'Game over!'
      }
      //else the user has guesses left so we'll check every guess and give a hint
      else {
        let diff = this.difference();
        //determine how close is the player's guess to the winning number
        //the less is the difference the closer he's to win!!!
        if (diff < 10) {
          feedbackText = "You're burning up! " + this.isLower();
        } else if (diff < 25) {
          feedbackText = "You're lukewarm. " + this.isLower();
        } else if (diff < 50) {
          feedbackText = "You're a bit chilly. " + this.isLower();
        } else if (diff < 100) {
          feedbackText = "You're ice cold! " + this.isLower();
        }
        //???what's going on below??
        document.querySelector(
          `#guess-list li:nth-child(${this.pastGuesses.length})`
        ).innerHTML = this.playersGuess;
      }
    }

    // set game messages produced by checkGuess method
    document.querySelector(".guesses_feedback").textContent = feedbackText;

    return feedbackText;
  }

  provideHint() {
    let arr = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(arr);
  }
}
const newGame = () => {
  return new Game();
};

function playGame() {
  let game = newGame();

  // We are grabbing the submit button from our html
  let submitButton = document.getElementById("submit-button");
  let resetButton = document.querySelector("#playAgain-button");
  let hintButton = document.querySelector("#hint-button");
  
  // We are listening for when the user clicks on our button.
  // When they click, we will check in the input field to see if
  // they have guessed a number. Then we will run the function `checkGuess`,
  // and give it the player's guess, the winning number, and the empty array
  // of guesses!

  submitButton.addEventListener("click", function () {
    //but how to make evry guess appear sepparatly??
  document.querySelector("#guess-list").style.display = "block";
    // document.querySelector('.guess').style.display = 'inline';
    let playersGuess = Number(document.getElementById("input-number").value);
    //defining the actual number from input
    // let playersGuess = inputNumber.value;
    //after the number was already submited we'll set the input area back to empty ''
    document.getElementById("input-number").value = "";
    // get output message associated with guess(num) from checkguess func above
    game.playersGuessSubmission(playersGuess);
  });
  hintButton.addEventListener("click", function () {
    document.querySelector(
      ".guesses_feedback"
    ).innerHTML = `${game.provideHint()}`;
  });
  resetButton.addEventListener("click", function () {
    document.location.reload();
  });
}
//start the game!
playGame();
