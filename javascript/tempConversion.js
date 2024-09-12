//Kelvin temp
const kelvin = 0;
//Celsius conversion from Kelvin
let celsius = kelvin - 273;
let fahrenheit = celsius * (9 / 5) + 32;
//Floor decimals in F conversion
fahrenheit = Math.floor(fahrenheit);
console.log(`The temperature is ${fahrenheit} degrees Fahrenheit`);
