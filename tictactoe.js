const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
// Initialize turn system
let turn;

// creating the game board
function createGameBoard() {
  // Create the empty 3 x 3 board
  const emptyTiles = " ".repeat(9).split("");
  // Give button functionality to each tile using map, could also use for if wanted
  // .join is needed at the end to get rid of the commas, so it is basically one long string of HTML
  const tileGrid = emptyTiles
    .map((tile) => `<button class="tile">X</button>`)
    .join("");

  gameBoard.innerHTML = tileGrid;
  turn = "X";
  info.textContent = `${turn}'s turn`;
}

createGameBoard();
