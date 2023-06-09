const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
const restartButton = document.querySelector("#restart");
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
  // When handling the handleMouseOver function, we cannot use:
  // gameBoard.addEventListener("mouseenter", handleMouseHover),
  // because doing so will affect the whole board, not the inidividual tiles
  const allTiles = gameBoard.querySelectorAll(".tile");
  allTiles.forEach((t) => {
    t.addEventListener("mouseenter", handleMouseHover);
    // mouseleave event is fired at an element when the cursor is moved out,
    // in this case it fires the handleMouseHoverLeave function made
    t.addEventListener("mouseleave", handleMouseHoverLeave);
  });
  // Does not matter for the first time or for Firefox users
  gameBoard.removeAttribute("inert");
}

createGameBoard();

function updateTurn() {
  turn = turn === "X" ? "O" : "X";
  info.textContent = `${turn}'s turn`;
  // Used to set a faint blue or red tint on the tiles to indicate whos turn it is
  // However the individual X and O's will all be red unless we update them in the e.target, within the handleBoardGameClick function
  document.documentElement.style.setProperty("--hue", turn === "X" ? 10 : 200);
}

function restartGame() {
  let seconds = 3;
  const timer = setInterval(() => {
    info.textContent = `Restarting in ${seconds}...`;
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      createGameBoard();
    }
  }, 1000);
}

function winMessage() {
  info.textContent = `${turn} wins!`;
  // The game will continue if the event listener persists, thus we remove it
  gameBoard.removeEventListener("click", handleGameBoardClick);
  // However, even if we can't place X or O's anymore we can still hover over it,
  // We can use inert and set to true to remove all interactivity, works in all browsers except for FireFox
  gameBoard.setAttribute("inert", true);
  setTimeout(restartGame, 500);
}

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

  if (winner) {
    return winMessage();
  }
  updateTurn();
}

// Click event for the tiles to know where to place the X and O's
// You can add an event listener to each individual tile but this function is for the whole board instead.
function handleGameBoardClick(e) {
  // Setting a const to for a value existing
  const valueExists = e.target.dataset.value;
  // If value does not exists, this happens
  if (!valueExists) {
    // Reminder that turn is default X
    e.target.dataset.value = turn;
    // Using e.target instead of document because
    e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
    checkScore();
  }
}

function handleMouseHover(e) {
  // Once again setting a const for a value existing
  const valueExists = e.target.dataset.value;
  if (!valueExists) {
    // Hovering will indicate whatever turn it currently is
    e.target.dataset.hover = turn;
    e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
  }
}

function handleMouseHoverLeave(e) {
  e.target.dataset.hover = "";
}

restartButton.addEventListener("click", restartGame);