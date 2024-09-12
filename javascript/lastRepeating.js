const string = "HelloWorld";

for (var x = 0; x <= string.length; x++) {
  if (string.indexOf(x) === string.lastIndexOf(x)) {
    console.log(x);
    return x;
  }
}
