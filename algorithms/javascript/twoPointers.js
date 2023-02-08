// two pointers algorithm

let array = [1, 2, 3, 4, 6, 10, 19, 23, 40, 44, 55, 65, 67, 75, 88, 92, 132];

let twoPointers = (array, target) => {
	let startIndex = 0;
	let endIndex = array.length - 1;
	while (startIndex !== endIndex) {
		let sum = array[startIndex] + array[endIndex];
		if (sum === target) {
			return [array[startIndex], array[endIndex]];
		} else if (sum < target) {
			startIndex++;
		} else if (sum > target) {
			endIndex--;
		}
	}
	return "Doesn't exist";
};

console.log(twoPointers(array, 130));
