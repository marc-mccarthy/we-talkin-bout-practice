// sort number array

let array = [3, 4, 2, 10, 6, 55, 23, 67, 1, 88, 44, 132, 65, 92, 19, 40, 75];

let sortNumberArray = (array) => {
  console.log(array);
  return array.sort((a, b) => a - b);
};

console.log(sortNumberArray(array));
