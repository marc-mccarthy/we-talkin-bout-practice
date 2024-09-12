let raceNumber = Math.floor(Math.random() * 1000);
let rEarly = false;
let rAge = 19;

if (rAge > 18 && rEarly === true) {
  raceNumber += 1000;
}

if (rAge > 18 && rEarly === true) {
  console.log(`Racer #${raceNumber}, your race begins at 9:30AM.`);
} else if (rAge > 18 && rEarly === false) {
  console.log(`Racer #${raceNumber}, your race begins at 11:00AM.`);
} else if (rAge < 18) {
  console.log(`Racer #${raceNumber}, your race begins at 12:30PM.`);
} else {
  console.log("Please see the registration desk.");
}
