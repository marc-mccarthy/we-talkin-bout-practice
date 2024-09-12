let array = [
  3, 4, 2, 10, 6, 55, 23, 67, 1, 88, 44, 132, 65, 65, 92, 19, 40, 75,
];

function hasDuplicates(array) {
  console.log(new Set(array));
}

hasDuplicates(array);
