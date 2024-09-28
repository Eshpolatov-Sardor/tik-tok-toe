type Sardor = "X" | "O" | null;
type Oyin = Sardor[];

interface Gamerstart {
  sardor: Oyin;
  curSardor: Sardor;
  isGame: boolean;
};

function initializeBoard(): Oyin { 
  return Array(9).fill(null) as Oyin
}

function createGameState(): Gamerstart {
  return {
    sardor: initializeBoard(),
    curSardor: "X",
    isGame: false,
  };
}


function renderBoard (gameState: Gamerstart,boardElement: HTMLElement): void{
  const cells = boardElement.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    (cell as HTMLElement).textContent = gameState.sardor[index];
  });
};
function checkWin (sardor: Oyin): number[] | null {
  const winningCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8], [0, 3, 6],[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (sardor[a] && sardor[a] === sardor[b] && sardor[a] === sardor[c]) {
      return combination;
    }
  }
  return null;
};

function handleCellClick (index: number,gameState: Gamerstart,boardElement: HTMLElement,winningMessageElement: HTMLElement): void{
  if (gameState.sardor[index] || gameState.isGame) return;

  gameState.sardor[index] = gameState.curSardor;
  const winningCells = checkWin(gameState.sardor);

  if (winningCells) {
    gameState.isGame = true;
    displayWinner(
      gameState.curSardor!,
      winningCells,
      boardElement,
      winningMessageElement
    );
  } 
  else {
    gameState.curSardor = gameState.curSardor === "X" ? "O" : "X";
  }

  renderBoard(gameState, boardElement);
};

function displayWinner (winner: Sardor,winningCells: number[],boardElement: HTMLElement,winningMessageElement: HTMLElement): void {
  winningMessageElement.textContent = `${winner} yutdi!`;
  winningMessageElement.className = "text-2xl text-green-500 mt-4";
  boardElement.after(winningMessageElement);

  winningCells.forEach((index) => {
    const cell = boardElement.querySelector(`[data-index='${index}']`);
    if (cell) {
      cell.classList.add("winning-cell");
    }
  });
};

function resetGame (gameState: Gamerstart,boardElement: HTMLElement,winningMessageElement: HTMLElement): void {
  gameState.sardor = initializeBoard();
  gameState.curSardor = "X";
  gameState.isGame = false;
  renderBoard(gameState, boardElement);
  winningMessageElement.textContent = "";
  const cells = boardElement.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("winning-cell");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const gameState = createGameState();
  const boardElement = document.querySelector("#board") as HTMLDivElement;
  const resetButton = document.getElementById("resetButton") as HTMLDivElement;
  const winningMessageElement = document.createElement("div");
  winningMessageElement.className = "text-center text-red-500";

  boardElement.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const index = target.getAttribute("data-index");
    if (target.classList.contains("cell")) {
      handleCellClick(+index, gameState, boardElement, winningMessageElement);
    }
  });
  resetButton.addEventListener("click", () => {
    resetGame(gameState, boardElement, winningMessageElement);
  });
  renderBoard(gameState, boardElement);
});
