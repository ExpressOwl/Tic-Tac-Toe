const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
// Initialize turn system
let turn;

const winConditions = [
  [0, 1, 2], // Top Row
  [3, 4, 5], // Middle Row
  [6, 7, 8], // Bottom Row

  [0, 3, 6], // Left Column
  [1, 4, 7], // Middle Column
  [2, 5, 8], // Right Column

  [0, 4, 8], // Diagonal left to right
  [2, 4, 6], // Diagonal right to left
];

// creating the game board
function createGameBoard() {
  // Create the empty 3 x 3 board
  const emptyTiles = " ".repeat(9).split("");
  // Give button functionality to each tile using map, could also use for if wanted
  // .join is needed at the end to get rid of the commas, so it is basically one long string of HTML
  const tileGrid = emptyTiles
    .map((tile) => `<button class="tile"></button>`)
    .join("");

  gameBoard.innerHTML = tileGrid;
  turn = "X";
  info.textContent = `${turn}'s turn`;

  gameBoard.addEventListener("click", handleGameBoardClick);
}

createGameBoard();

// Check Score and then update the board,the handleBoardGame function was made first though
function checkScore() {
  // Getting the values of everything on the game board
  // Grabbing an array of all the tiles
  const allTiles = [...document.querySelectorAll(".tile")];
  // Grabbing the data values on the tiles, so we get X, O or undefined
  const tileValues = allTiles.map((t) => t.dataset.value);
  // Now that we know the data values in the array, we can match it with the win conidtions with the some() method
  // Return true if there is a winning combo
  const winner = winConditions.some((combo) => {
    const [a, b, c] = combo;
    return (
      tileValues[a] &&
      tileValues[a] === tileValues[b] &&
      tileValues[a] === tileValues[c]
    );
  });
  console.log(winner);

  turn = turn === "X" ? "O" : "X";
}

// Click event for the tiles to know where to place the X and O's
// You can add an event listener to each individual tile but this function is for the whole board instead.
function handleGameBoardClick(e) {
  const valueExists = e.target.dataset.value;
  if (!valueExists) {
    // Reminder that turn is default X
    e.target.dataset.value = turn;
    checkScore();
  }
}
