// chessboard

let board = 8;
let game = '';

for (let i = 0; i < board; i++) {
  for (let j = 0; j < board; j++) {
    if ((i + j) % 2 == 0) {
      game += ' ';
    } else {
      game += '#';
    }
  }
  game += '\n';
}

console.log(game);
