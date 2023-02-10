// valid parentheses

let isValidParentheses = (s) => {
  const symbols = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  if (s.length % 2 !== 0 || s[0] === "}" || s[0] === "]" || s[0] === ")")
    return false;
  if (
    s[s.length - 1] === "[" ||
    s[s.length - 1] === "(" ||
    s[s.length - 1] === "{"
  )
    return false;

  let array = [];
  for (let st of s) {
    if (st === "{" || st === "[" || st === "(") {
      array.push(st);
    } else if (symbols[array.pop()] !== st) {
      return false;
    }
  }
  return array.length === 0;
};

console.log(isValidParentheses("{[()]}"));
