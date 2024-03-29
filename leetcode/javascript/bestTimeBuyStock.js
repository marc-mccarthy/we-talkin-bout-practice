// best time to buy and sell stock

let bestTimeBuyStock = function (prices) {
  let min = prices[0];
  let max = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else if (prices[i] - min > max) {
      max = prices[i] - min;
    }
  }
  return max;
};

console.log(bestTimeBuyStock([2, 3, 2, 5, 7, 10]));
