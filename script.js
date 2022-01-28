const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");
const playerTurn = document.getElementById("result");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = {"p1": 0, "p2": 0};
let score = {"p1": 0, "p2": 0};
let player = "p1";

// helper function for displaying total score of a player
function display_score (playerScore, player) {
  document.getElementById(/*"p1-score"*/ player + "-score").style.width = playerScore + "%";
  if (playerScore !== 100) {
    document.getElementById(/*"p1-score"*/ player + "-score").setAttribute("aria-valuenow", playerScore);
    document.getElementById(/*"p1-score"*/ player + "-score").innerText = playerScore;
  }
  else {
    document.getElementById(/*"p1-score"*/ player + "-score").setAttribute("aria-valuenow", playerScore);
    document.getElementById(/*"p1-score"*/ player + "-score").classList.add("bg-success");
    document.getElementById(/*"p1-score"*/ player + "-score").innerText = playerScore + "🎉";
  }
}

// helper function for displaying the turn total of a player
function display_holdValue (playerHoldValue, player) {
  document.getElementById(/*"p1-hold"*/ player + "-hold").style.width = playerHoldValue + "%";
  document.getElementById(/*"p1-hold"*/ player + "-hold").setAttribute("aria-valuenow", playerHoldValue);
  document.getElementById(/*"p1-hold"*/ player + "-hold").innerText = playerHoldValue;
}

// helper function for switching turns
function switchPlayer() {
  if (player === "p1") {
    player = "p2";
    playerTurn.innerHTML = "Player-2 turn!";
  }
  else {
    player = "p1";
    playerTurn.innerHTML = "Player-1 turn!";
  }
}

function hold() {
  score[player] += holdValue[player];
  holdValue[player] = 0;
  display_holdValue(holdValue[player], player);
  display_score(score[player], player);
  switchPlayer();
}

function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue  - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  // switch turn if faceValue equals 1
  if(faceValue === 1) {
    holdValue[player] = 0;
    display_holdValue(holdValue[player], player);
    switchPlayer();
  }
  // end game if score reaches 100
  else if (holdValue[player] + score[player] + faceValue >= 100) {
    // display congratulations and winner
    display_score (100, player);
    display_holdValue(0, player);
    playerTurn.innerHTML = "Player-" + player[1] + " won!";
    // disable buttons
    holdBtn.disabled = true;
    rollBtn.disabled = true;
  }
  // otherwise continue the game
  else { 
    holdValue[player] += faceValue;
    display_holdValue(holdValue[player], player);
  }

}
