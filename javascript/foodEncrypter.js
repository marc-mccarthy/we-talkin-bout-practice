let favoriteFoods = [
  'zucchini',
  'yam',
  'xigua',
  'water cress',
  'vegetables',
  'quinoa',
  'peas',
  'kale',
  'jicama',
  'fiddlehead',
];
let secretFavoriteFoods = ['pancakes', 'pizza', 'cake', 'ice cream'];
let secretKey = [];

let favoriteFoodsString = favoriteFoods.join(''); //Joins favoriteFoods to create string 'zucchiniyamxiguawater cressvegetablesquinoapeaskalejicamafiddlehead'

//Encrypt secret favorite foods into the secretKey array
for (f = 0; f < secretFavoriteFoods.length; f++) {
  //Looping through each index (food) in secretFavoriteFoods array
  secretKey[f] = [];
  for (c = 0; c < secretFavoriteFoods[f].length; c++) {
    //Looping through each index (character) at each index (food) in secretFavoriteFoods array
    secretKey[f].push([favoriteFoodsString.indexOf(secretFavoriteFoods[f][c])]); //stores the location of each character in the favoriteFoodsString
  }
}

console.table(secretKey);

//Decrypt secretKey
let testSecretFavoriteFoods = [];

for (f = 0; f < secretKey.length; f++) {
  //Loop through the first secretKey array
  let tempWord = []; //Innitialize tempWord as an empty array at the beginning of each loop
  for (c = 0; c < secretKey[f].length; c++) {
    //Loop through the internal secretKey array
    tempWord.push(
      //Add string value character to tempWord array based on the integer value stored in secretKey at f, at c
      favoriteFoodsString.at(secretKey[f][c])
    );
  }
  testSecretFavoriteFoods.push(tempWord.join('')); //Join the string values in the tempWord array and push that string into the testSecretFavoriteFoods array
}

console.log(testSecretFavoriteFoods);
