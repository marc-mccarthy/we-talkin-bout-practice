// The code below contains a type error: we're trying to assign a number to a variable of type string. Fix the type so that the code can compile and run.
const someNumber: number = 5;
console.log(someNumber);

// Write a function that makes words plural by adding "s". Remember that '+' joins two strings.
function pluralize(string: string): string {
  return string + "s";
}
console.log(pluralize("dog"));

// Write a function that adds or subtracts 1 from a number. Argument 1 is the number. Argument 2 is a boolean. When it's true, add; otherwise, subtract.
function addOrSubtract(num: number, bool: boolean): number {
  return bool === true ? num + 1 : num - 1;
}
console.log(addOrSubtract(5, true));

// Write a function that adds two numbers using +. It should type error when passed strings.
function add(num1: number, num2: number): number {
  return num1 + num2;
}
console.log(add(3, 6));

// Write a function that takes an array of numbers, then returns it. It shouldn't change the array in any way. Force the array to contain numbers, so that other types of arrays are type errors.
function f(arr: number[]): number[] {
  return arr;
}
console.log(f([1, 2, 3]));
