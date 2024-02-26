document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const handleCellClick = (index) => {
        if (gameState[index] === "" && !checkWinner()) {
            gameState[index] = currentPlayer;
            render();
            if (!checkWinner() && !checkDraw()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    };

    const render = () => {
        board.innerHTML = "";
        gameState.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.textContent = cell;
            cellDiv.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cellDiv);
        });
    };

    const checkWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.textContent = `Player ${gameState[a]} wins!`;
                alert('Player '+gameState[a]+ ' wins!')
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        if (!gameState.includes("")) {
            status.textContent = "It's a draw!";
            alert("It's a draw!")
            return true;
        }
        return false;
    };

    const resetGame = () => {
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `Player ${currentPlayer}'s turn`;
        render();
    };

    resetButton.addEventListener("click", resetGame);

    render();
});
