let array = [0, 1, 2, 6, 6, 10, 19, 23, 40, 44, 55, 55, 65, 67, 75, 88, 88, 132, 143, 143]

let removeDuplicates = (array) => {
  let first = 0
  let second = 1
  while (array[second] != '-') {
    if (array[first] === array[second]) {
        array.push(array.splice(second, 1).pop());
        array[array.length - 1] = '-'
    } else if (array[first] === '-' && array[second] === '-') {
      return second
    } 
      else {
      first++
      second++
    }
  }
  return array;
};

console.log(removeDuplicates(array))
