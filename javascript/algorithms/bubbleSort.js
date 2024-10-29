console.log('hello world');

let a = 3;
let b = 'cat';

console.log(a == b);
console.log(a === b); // false
console.log(a && b); // b
console.log(a || b); // ?

let string0 = 'they said: "What did you say?"';
let string1 = "I replied: it's the Moon";
let string2 = `I replied: "it's the Moon"`;
let string3 = 'I replied: "it\'s the Moon"';

let obj0 = {
  thing: 'a',
};

let obj1 = {
  thing: 'a',
};

console.log(obj0.thing == obj1.thing);

let arr0 = [0, 1, 2];
let arr1 = [0, 1, 2];

console.log(arr0 == arr1);

// recursive //
let counter = 0;

function countUp() {
  counter++;
  console.log('in countUp:', counter);
  if (counter < 10) countUp();
}

countUp();

let arr2 = ['Kyo', 'Abby', 'Fred', 'Commander Wisdom', 'Professor Trouble'];

let index = 0;
function displayArray() {
  console.log(arr2[index]);
  index++;
  if (index < arr2.length) {
    displayArray();
  }
}

displayArray();

// switching a value //
let val0 = true;
let val1 = 'asdf';
console.log(val0, val1);

let temp = val0;
val0 = val1;
val1 = temp;
console.log(val0, val1);
