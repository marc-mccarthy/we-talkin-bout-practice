let input = "I am tired of eating ocean garbage.";
const vowels = ["a", "e", "i", "o", "u"];
let resultArray = [];

for (let i = 0; i < input.length; i++) {
  if (input[i] === "e") {
    resultArray.push(input[i]);
  }
  if (input[i] === "u") {
    resultArray.push(input[i]);
  }
  for (let v = 0; v < vowels.length; v++) {
    if (input[i] === vowels[v]) {
      resultArray.push(input[i]);
    }
  }
}
let resultString = resultArray.join("");
console.log(resultString.toUpperCase());
