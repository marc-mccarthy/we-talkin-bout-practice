// century from year

let centuryFromYear = (year) => {
  let num = year / 100;
  if (year % 100 === 0) {
    return num;
  } else {
    return parseInt(num) + 1;
  }
};

console.log(centuryFromYear(2003));
