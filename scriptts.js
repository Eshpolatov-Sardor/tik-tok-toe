;
var initializeBoard = function () { return Array(9).fill(null); };
var createGameState = function () { return ({
    sardor: initializeBoard(),
    curSardor: "X",
    isGame: false,
}); };
var renderBoard = function (gameState, boardElement) {
    var cells = boardElement.querySelectorAll(".cell");
    cells.forEach(function (cell, index) {
        cell.textContent = gameState.sardor[index];
    });
};
var checkWin = function (sardor) {
    var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],];
    for (var _i = 0, winningCombinations_1 = winningCombinations; _i < winningCombinations_1.length; _i++) {
        var combination = winningCombinations_1[_i];
        var a = combination[0], b = combination[1], c = combination[2];
        if (sardor[a] && sardor[a] === sardor[b] && sardor[a] === sardor[c]) {
            return combination;
        }
    }
    return null;
};
var handleCellClick = function (index, gameState, boardElement, winningMessageElement) {
    if (gameState.sardor[index] || gameState.isGame)
        return;
    gameState.sardor[index] = gameState.curSardor;
    var winningCells = checkWin(gameState.sardor);
    if (winningCells) {
        gameState.isGame = true;
        displayWinner(gameState.curSardor, winningCells, boardElement, winningMessageElement);
    }
    else {
        gameState.curSardor = gameState.curSardor === "X" ? "O" : "X";
    }
    renderBoard(gameState, boardElement);
};
var displayWinner = function (winner, winningCells, boardElement, winningMessageElement) {
    winningMessageElement.textContent = "".concat(winner, " yutdi!");
    winningMessageElement.className = "text-2xl text-green-500 mt-4";
    boardElement.after(winningMessageElement);
    winningCells.forEach(function (index) {
        var cell = boardElement.querySelector("[data-index='".concat(index, "']"));
        if (cell) {
            cell.classList.add("winning-cell");
        }
    });
};
var resetGame = function (gameState, boardElement, winningMessageElement) {
    gameState.sardor = initializeBoard();
    gameState.curSardor = "X";
    gameState.isGame = false;
    renderBoard(gameState, boardElement);
    winningMessageElement.textContent = "";
    var cells = boardElement.querySelectorAll(".cell");
    cells.forEach(function (cell) {
        cell.classList.remove("winning-cell");
    });
};
document.addEventListener("DOMContentLoaded", function () {
    var gameState = createGameState();
    var boardElement = document.querySelector("#board");
    var resetButton = document.getElementById("resetButton");
    var winningMessageElement = document.createElement("div");
    winningMessageElement.className = "text-center text-red-500";
    boardElement.addEventListener("click", function (event) {
        var target = event.target;
        var index = target.getAttribute("data-index");
        if (target.classList.contains("cell")) {
            handleCellClick(+index, gameState, boardElement, winningMessageElement);
        }
    });
    resetButton.addEventListener("click", function () {
        resetGame(gameState, boardElement, winningMessageElement);
    });
    renderBoard(gameState, boardElement);
});
