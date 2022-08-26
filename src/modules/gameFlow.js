import GameBoard from "./gameBoard";
import {
  generateGameboard,
  switchActiveTiles,
  inGameNotif,
  genStr,
  deathAnim,
} from "./dom";
import { createShipObjs } from "./ship";
import { placeShipOnTiles } from "./placeShips";
import { data, playerName, resetPlacedShip } from "./storeData";
import { placeShipsOpponent } from "./placeShipsOpponent";
import { aiStartTurn } from "./opponentAI";
import { enableRotate, hideAllRotate } from "./rotateRelated";
import { hideName, enableName } from "./nameInput";

let gameStatus = "";
let waitTime = 3000;

function setUp() {
  gameStatus = "initializing";
  const gameBoard = new GameBoard();

  gameBoard.setTiles("player1");
  generateGameboard("player1");

  gameBoard.setTiles("player2");
  generateGameboard("player2");

  hideAllRotate();

  enableName();
}

function nameEntered() {
  hideName();

  initializeGame();
}

function initializeGame() {
  switchActiveTiles("player1");

  placeShips("player1");
  placeShips("player2");

  enableRotate();
}

function placeShips(player) {
  gameStatus = "placingShips";
  createShipObjs(player);
  resetPlacedShip();
  let currentShipID = data["globalData"].currentPlacedShipID;

  if (player == "player1") {
    placeShipOnTiles(player, currentShipID);
  } else {
    placeShipsOpponent();
  }
}

function shipPlacementComplete() {
  switchActiveTiles("player1");
  switchActiveTiles("player2");

  hideAllRotate();

  startGame();
}

function startGame() {
  gameStatus = "player1 turn";
  inGameNotif(playerName + "'s turn");
}

function switchTurn() {
  if (gameStatus == "player1 turn") {
    genStr("player1");
    switchActiveTiles("player2");
    gameStatus = "player2 turn";
    setTimeout(() => {
      aiStartTurn();
    }, waitTime);
  } else {
    genStr("player2");
    gameStatus = "player1 turn";

    setTimeout(() => {
      switchActiveTiles("player2");
    }, waitTime / 2);
  }
}

function playerWins(winningPlayer) {
  let winner = "";
  gameStatus = "end";
  switchActiveTiles("player2");

  if (winningPlayer === "player1") {
    deathAnim("player2");
    winner = playerName;
  } else if (winningPlayer === "player2") {
    deathAnim("player1");
    winner = "Computer";
  }
  inGameNotif(winner + " wins!");
}

export {
  initializeGame,
  gameStatus,
  shipPlacementComplete,
  playerWins,
  switchTurn,
  setUp,
  nameEntered,
  waitTime,
};
