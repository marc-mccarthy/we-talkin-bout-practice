function getSleepHours(day) {
  day = day.toLowerCase();
  switch (day) {
    case "monday":
      return 8;
    case "tuesday":
      return 8;
    case "wednesday":
      return 10;
    case "thursday":
      return 8;
    case "friday":
      return 8;
    case "saturday":
      return 8;
    case "sunday":
      return 8;
  }
}

function getActualSleepHours() {
  return (
    getSleepHours("monday") +
    getSleepHours("tuesday") +
    getSleepHours("wednesday") +
    getSleepHours("thursday") +
    getSleepHours("friday") +
    getSleepHours("saturday") +
    getSleepHours("sunday")
  );
}

function getIdealSleepHours() {
  let idealHours = 8;
  return idealHours * 7;
}

function calculateSleepDebt() {
  let actualSleepHours = getActualSleepHours();
  let idealSleepHours = getIdealSleepHours();
  if (actualSleepHours === idealSleepHours) {
    return console.log("You have the perfect ammount of sleep!");
  } else if (actualSleepHours > idealSleepHours) {
    let over = actualSleepHours - idealSleepHours;
    return console.log(`You are getting ${over} too many hours of sleep!`);
  } else if (actualSleepHours < idealSleepHours) {
    let under = idealSleepHours - actualSleepHours;
    return console.log(`You need to get ${under} more hours of sleep!`);
  }
}
calculateSleepDebt();
