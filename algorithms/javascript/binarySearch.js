// binary search algorithm

let array = [3, 4, 2, 10, 6, 55, 23, 67, 1, 88, 44, 132, 65, 92, 19, 40, 75];

let binarySearch = (array, num) => {
	let sorted = array.sort((a, b) => a - b);
	let startIndex = 0;
	let endIndex = sorted.length - 1;
	while (startIndex <= endIndex) {
		let midIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
		if (sorted[midIndex] === num) {
			return num;
		} else if (num < sorted[midIndex]) {
			endIndex = midIndex - 1;
		} else {
			startIndex = midIndex + 1;
		}
	}
	return "Number not found in the array";
};

console.log(binarySearch(array, 65));
