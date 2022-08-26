import { data } from "./storeData";
import { playerWins, switchTurn } from "./gameFlow";

function checkWin(player) {
  let ships = data[player].shipData;
  let shipsSunk = 0;
  let winningPlayer;

  ships.forEach((ship) => {
    if (ship.sunk == true) {
      shipsSunk++;
    }
  });

  if (shipsSunk >= 5) {
    if (player == "player1") {
      winningPlayer = "player2";
    } else {
      winningPlayer = "player1";
    }
    playerWins(winningPlayer);
  } else {
    switchTurn();
  }
}

export { checkWin };
