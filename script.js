const gameBoard = (() => {
  let gameBoardGrid = 3;
  let gameBoardSpots = new Array(gameBoardGrid * gameBoardGrid);

  const gameBoard = document.querySelector("#game-board");
  gameBoard.style.cssText = `grid-template-columns: repeat(${gameBoardGrid}, 1fr)`;

  const renderGameBoard = () => {
    gameBoard.textContent = "";

    for (let i = 0; i < gameBoardSpots.length; i++) {
      const gameBoardSpot = document.createElement("div");
      gameBoardSpot.classList.add("game-board-spot");
      gameBoardSpot.textContent = gameBoardSpots[i];

      gameBoard.appendChild(gameBoardSpot);
    }
  };

  return { renderGameBoard, gameBoardSpots };
})();

gameBoard.renderGameBoard();

const displayController = (() => {
  let currentPlayer = "O";
  let currentRound = 1;
  let gameRound = document.querySelector("#game-round");
  let xScore = 0;
  let oScore = 0;
  const xScoreElement = document.querySelector("#x-score");
  const oScoreElement = document.querySelector("#o-score");
  const winnerAnnouncementDialog = document.querySelector(
    "#winner-announcement-dialog"
  );
  const winnerAnnouncement = document.querySelector("#winner-announcement");

  const closeWinnerAnnouncementDialog = () => {
    winnerAnnouncementDialog.addEventListener("close", () => {
      for (let i = 0; i < gameBoard.gameBoardSpots.length; i++) {
        gameBoard.gameBoardSpots[i] = undefined;
      }

      currentPlayer = "X";
      displayCurrentPlayer();
      currentPlayer = "O";
      gameBoard.renderGameBoard();
      makeGameBoardSpotsClickable();
    });
  };

  const makeGameBoardSpotsClickable = () => {
    const displayGameBoardSpots = document.querySelectorAll(".game-board-spot");

    for (let i = 0; i < displayGameBoardSpots.length; i++) {
      const displayGameBoardSpot = displayGameBoardSpots[i];

      displayGameBoardSpot.addEventListener("click", () => {
        if (gameBoard.gameBoardSpots[i] == undefined) {
          gameBoard.gameBoardSpots[i] = currentPlayer == "X" ? "O" : "X";
          displayCurrentPlayer();
          currentPlayer = currentPlayer == "X" ? "O" : "X";
          console.log(gameBoard.gameBoardSpots);
        }
        gameBoard.renderGameBoard();
        checkForRoundWinner();
        displayController.makeGameBoardSpotsClickable();
      });
    }
  };

  const currentPlayerElement = document.querySelector("#current-player");
  const displayCurrentPlayer = () => {
    currentPlayerElement.textContent = `${currentPlayer} turn`;
  };

  const xWon = () => {
    xScore++;
    xScoreElement.textContent = `: ${xScore}`;
    oScoreElement.textContent = `: ${oScore}`;

    winnerAnnouncement.textContent = `Round ${currentRound}: X won!`;
    currentRound++;
    gameRound.textContent = `Round ${currentRound}`;
    winnerAnnouncementDialog.showModal();
    closeWinnerAnnouncementDialog();
    checkGameWinner();
  };

  const oWon = () => {
    oScore++;
    xScoreElement.textContent = `: ${xScore}`;
    oScoreElement.textContent = `: ${oScore}`;

    winnerAnnouncement.textContent = `Round ${currentRound}: O won!`;
    currentRound++;
    gameRound.textContent = `Round ${currentRound}`;
    winnerAnnouncementDialog.showModal();
    closeWinnerAnnouncementDialog();
    checkGameWinner();
  };

  const draw = () => {
    winnerAnnouncement.textContent = `Round ${currentRound}: Draw!`;
    currentRound++;
    gameRound.textContent = `Round ${currentRound}`;
    winnerAnnouncementDialog.showModal();
    closeWinnerAnnouncementDialog();
    checkGameWinner();
  };

  const announceGameWinner = (winner) => {
    xScore = 0;
    oScore = 0;
    xScoreElement.textContent = `: ${xScore}`;
    oScoreElement.textContent = `: ${oScore}`;

    winnerAnnouncement.textContent = `${winner} won the game!`;
    currentRound = 1;
    gameRound.textContent = `Round ${currentRound}`;
    winnerAnnouncementDialog.showModal();
    closeWinnerAnnouncementDialog();
  };

  const checkGameWinner = () => {
    if (currentRound == 3 && (xScore > oScore + 1 || oScore > xScore + 1)) {
      announceGameWinner(xScore > oScore ? "X" : "O");
    } else if (currentRound == 4 && (xScore > oScore || oScore > xScore)) {
      announceGameWinner(xScore > oScore ? "X" : "O");
    } else if (currentRound == 4 && xScore == oScore) {
      xScore = 0;
      oScore = 0;
      xScoreElement.textContent = `: ${xScore}`;
      oScoreElement.textContent = `: ${oScore}`;

      winnerAnnouncement.textContent = `It's a draw!`;
      currentRound = 1;
      gameRound.textContent = `Round ${currentRound}`;
      winnerAnnouncementDialog.showModal();
      closeWinnerAnnouncementDialog();
    }
  };

  const checkForRoundWinner = () => {
    if (
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[1] &&
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[2] &&
      gameBoard.gameBoardSpots[0] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[3] &&
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[6] &&
      gameBoard.gameBoardSpots[0] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[8] &&
      gameBoard.gameBoardSpots[0] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[1] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[1] == gameBoard.gameBoardSpots[7] &&
      gameBoard.gameBoardSpots[1] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[5] &&
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[8] &&
      gameBoard.gameBoardSpots[2] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[6] &&
      gameBoard.gameBoardSpots[2] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[3] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[3] == gameBoard.gameBoardSpots[5] &&
      gameBoard.gameBoardSpots[3] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[6] == gameBoard.gameBoardSpots[7] &&
      gameBoard.gameBoardSpots[6] == gameBoard.gameBoardSpots[8] &&
      gameBoard.gameBoardSpots[6] == "X"
    ) {
      xWon();
    } else if (
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[1] &&
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[2] &&
      gameBoard.gameBoardSpots[0] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[3] &&
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[6] &&
      gameBoard.gameBoardSpots[0] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[0] == gameBoard.gameBoardSpots[8] &&
      gameBoard.gameBoardSpots[0] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[1] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[1] == gameBoard.gameBoardSpots[7] &&
      gameBoard.gameBoardSpots[1] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[5] &&
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[8] &&
      gameBoard.gameBoardSpots[2] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[2] == gameBoard.gameBoardSpots[6] &&
      gameBoard.gameBoardSpots[2] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[3] == gameBoard.gameBoardSpots[4] &&
      gameBoard.gameBoardSpots[3] == gameBoard.gameBoardSpots[5] &&
      gameBoard.gameBoardSpots[3] == "O"
    ) {
      oWon();
    } else if (
      gameBoard.gameBoardSpots[6] == gameBoard.gameBoardSpots[7] &&
      gameBoard.gameBoardSpots[6] == gameBoard.gameBoardSpots[8] &&
      gameBoard.gameBoardSpots[6] == "O"
    ) {
      oWon();
    } else {
      if (checkIfGameBoardFull()) {
        draw();
      }
    }
  };

  const checkIfGameBoardFull = () => {
    for (let i = 0; i < gameBoard.gameBoardSpots.length; i++) {
      if (gameBoard.gameBoardSpots[i] == undefined) {
        return false;
      }
    }
    return true;
  };

  const restartBtn = document.querySelector("#restart-btn");

  restartBtn.addEventListener("click", () => {
    currentRound = 1;
    xScore = 0;
    oScore = 0;

    xScoreElement.textContent = `: ${xScore}`;
    oScoreElement.textContent = `: ${oScore}`;
    gameRound.textContent = `Round ${currentRound}`;

    for (let i = 0; i < gameBoard.gameBoardSpots.length; i++) {
      gameBoard.gameBoardSpots[i] = undefined;
    }

    currentPlayer = "X";
    displayCurrentPlayer();
    currentPlayer = "O";
    gameBoard.renderGameBoard();
    makeGameBoardSpotsClickable();
  });

  return { makeGameBoardSpotsClickable };
})();

displayController.makeGameBoardSpotsClickable();
