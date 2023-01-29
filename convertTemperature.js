var convertTemperature = function (celsius) {
	let ans = [];
	ans.push(celsius + 273.15);
	ans.push(celsius * 1.8 + 32.0);
	return ans;
};
