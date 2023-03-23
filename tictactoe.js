let board;
let playerO = 'O';
let playerX = 'X';
let currentPlayer = playerO;
let gameOver = false;

window.onload = function() {
  setGame();
}

// Function used to populate the board
function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // <div id="0-0"></div>
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      tile.classList.add("tile");
      if (i === 0 || i === 1) {
        tile.classList.add('horizontal-lines')
      } 
      if (j === 0 || j === 1) {
        tile.classList.add('vertical-lines')
      }
      tile.addEventListener('click', setTile);
      document.getElementById("board").append(tile)
    }
  }
} 

function setTile() {
  if (gameOver) {
    return;
  }

  let coordinates = this.id.split("-")
  let i = parseInt(coordinates[0]);
  let j = parseInt(coordinates[1]);

  board[i][j] = currentPlayer;
  this.innerText = currentPlayer;

  if (currentPlayer === playerO) {
    currentPlayer = playerX
  } else {
    currentPlayer = playerO;
  }
}