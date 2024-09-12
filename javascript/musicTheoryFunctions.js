//2 Octaves to avoid having to calculate wrap
const allNotes = [
  "a",
  "a#",
  "b",
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
  "a",
  "a#",
  "b",
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
];

const majorScale = [2, 2, 1, 2, 2, 2]; //Array of half-step intervals in a major scale from the starting note (e.g. 'c' + 2 half steps = 'd')
const dorianScale = [2, 1, 2, 2, 2, 1];
const majorChord = [4, 3]; //Array of half-step intervals in a major chord
const major7add11 = [4, 3, 4, 7]; //e.g. 'c' + 4 = e, e + 3 = g, g + 4 = b, b + 7 = f#

function getScaleOrChord(startingNote, scale) {
  let returnScale = [];
  returnScale[0] = startingNote;
  let previousNote = startingNote;
  for (let i = 0; i < scale.length; i++) {
    let nextNote = allNotes[allNotes.indexOf(previousNote) + scale[i]];
    returnScale.push(nextNote);
    previousNote = nextNote;
  }
  return returnScale;
}

console.log(getScaleOrChord("g", majorScale));
console.log(getScaleOrChord("d", dorianScale));
console.log(getScaleOrChord("c#", dorianScale));
console.log(getScaleOrChord("f#", majorChord));
console.log(getScaleOrChord("c", major7add11));
