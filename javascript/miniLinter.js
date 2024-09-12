let story =
  'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ["really", "very", "basically"];

let unnecessaryWords = ["extremely", "literally", "actually"];

let storyWords = story.split(" ");

let betterWords = storyWords.filter((word) => {
  if (!unnecessaryWords.includes(word)) {
    return word;
  }
});

let overusedWordsCount = 0;
let sentanceCount = 0;
storyWords.forEach((word) => {
  if (overusedWords.includes(word)) {
    overusedWordsCount++;
  }
  if (word.includes(".") || word.includes("!")) {
    sentanceCount++;
  }
});

function mostUsedWord(array) {
  let timesUsed = 0;
  let word = "";
  //Evaluate each word against each other word
  for (i = 0; i < array.length; i++) {
    let iTimesUsed = 0;
    let iWord = "";
    for (n = 0; n < array.length; n++) {
      if (array[i] === array[n]) {
        iTimesUsed++;
        iWord = array[n];
      }
    }
    if (iTimesUsed > timesUsed) {
      timesUsed = iTimesUsed;
      word = iWord;
    }
  }
  return word;
}

console.log(storyWords.length);
console.log(sentanceCount);
console.log(overusedWordsCount);
console.log(betterWords.join(" "));
console.log("The most used word is [" + mostUsedWord(storyWords) + "]");
