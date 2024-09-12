function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function play() {
  var startBet = Number(document.forms["luckySevens"]["betInput"].value);
  var cash = startBet;
  var diceOne;
  var diceTwo;
  var diceSum;
  var maxWinnings = 0;
  var rolls = 0;
  var rollTable = 0;

  if (cash <= 0) {
    alert("Your bet must be greater than $0.00! Bet again!");
  } else {
    while (cash > 0) {
      diceOne = rollDice();
      diceTwo = rollDice();
      diceSum = diceOne + diceTwo;
      rolls++;
      if (diceSum != 7) {
        cash--;
        console.log("You Lost!");
      } else {
        cash += 4;
        if (cash > maxWinnings) {
          maxWinnings += cash - maxWinnings;
          rollTable = rolls;
        }
        console.log("You Win!");
      }
    }
  }
  document.getElementById("results").style.display = "Block";
  document.getElementById("submitButton").innerText = "Play Again!";
  document.getElementById("start").innerText = startBet;
  document.getElementById("rollsNum").innerText = rolls;
  document.getElementById("max").innerText = maxWinnings;
  document.getElementById("rollTable").innerText = rollTable;
  return false;
}
