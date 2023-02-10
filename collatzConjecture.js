let collatzConjecture = (num) => {
	if (num === 1) {
		return 1;
	} else if (num % 2 === 0) {
		return 1 + collatzConjecture(num / 2);
	}
	if (num % 2 != 0) {
		return 1 + collatzConjecture(3 * num + 1);
	}
};

console.log(collatzConjecture(24));
