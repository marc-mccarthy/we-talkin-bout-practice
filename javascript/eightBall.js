let userName = '';
userName ? console.log(`Hello, ${userName}!`) : console.log('Hello!');

let userQuestion = 'Will I die?';

let randomNumber = Math.floor(Math.random() * 8);
console.log(randomNumber);
let eightBall = '';

switch (randomNumber) {
  case 0:
    eightBall = 'You are a goner';
    break;
  case 1:
    eightBall = 'It is certain';
    break;
  case 2:
    eightBall = 'It is decidedly so';
    break;
  case 3:
    eightBall = 'Reply hazy try again';
    break;
  case 4:
    eightBall = 'Cannot predict now';
    break;
  case 5:
    eightBall = 'Do not count on it';
    break;
  case 6:
    eightBall = 'My sources say no';
    break;
  case 7:
    eightBall = 'Outlook not so good';
    break;
  default:
    eightBall = 'error';
    break;
}

userName
  ? console.log(`${userName}, ${eightBall}`)
  : console.log(`${eightBall}`);
