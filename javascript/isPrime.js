// prime number

let isPrime = (num) => {
  if (num <= 1) {
    return "Is not a prime number";
  }
  let c = 2;
  while (c * c <= num) {
    if (num % c === 0) {
      return "Is not a prime number";
    } else {
      c += 1;
    }
  }
  return "Is a prime number";
};

console.log(isPrime(5));
