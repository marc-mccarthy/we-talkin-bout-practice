function getUserChoice(userInput) {
  userInput = userInput.toLowerCase();
  if (
    userInput === 'rock' ||
    userInput === 'paper' ||
    userInput === 'scissors' ||
    userInput === 'bomb'
  ) {
    return userInput;
  } else {
    return console.log('ERROR: Invalid input');
  }
}

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  switch (choice) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
    default:
      return 'error';
  }
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'Tie game!';
  }
  if (userChoice === 'rock') {
    if (computerChoice === 'scissors') {
      return 'You win!';
    } else {
      return 'You loose!';
    }
  }
  if (userChoice === 'paper') {
    if (computerChoice === 'rock') {
      return 'You win!';
    } else {
      return 'You loose!';
    }
  }
  if (userChoice === 'scissors') {
    if (computerChoice === 'paper') {
      return 'You win!';
    } else {
      return 'You loose!';
    }
  }
  if (userChoice === 'bomb') {
    return 'You win!';
  }
}

function playGame() {
  userChoice = getUserChoice('Rock');
  computerChoice = getComputerChoice();
  return console.log(determineWinner(userChoice, computerChoice));
}

playGame();
