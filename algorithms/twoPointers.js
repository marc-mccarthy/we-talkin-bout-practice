let array = [3, 4, 2, 10, 6, 55, 23, 67, 1, 88, 44, 132, 65, 92, 19, 40, 75];

let twoPointers = (array, target) => {
  let sorted = array.sort((a, b) => a - b);
  let startIndex = 0;
	let endIndex = sorted.length - 1;
  while (startIndex !== endIndex) {
    let sum = sorted[startIndex] + sorted[endIndex];
    if (sum === target) {
      return [sorted[startIndex], sorted[endIndex]];
    } else if (sum < target) {
       startIndex++;
    } else if (sum > target) {
      endIndex--;
    }
  }
  return "Doesn't exist";
}

console.log(twoPointers(array, 130));
