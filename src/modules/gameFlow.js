import GameBoard from "./gameBoard";
import { generateGameboard, placeShips } from "./dom";

let gameStatus = "";

function clearAll() {}

function initializeGame() {
  gameStatus = "initializing";
  const gameBoardP1 = new GameBoard();
  gameBoardP1.setTiles("player1");
  generateGameboard("player1");
  placeShips("player1");
}

function shipPlacementComplete() {
  console.log("Ships Placed");
  gameStatus = "";
}

export { initializeGame, gameStatus, shipPlacementComplete };
