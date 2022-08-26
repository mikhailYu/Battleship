import { data, lastShot } from "./storeData";
import { checkWin } from "./checkWin";
import { gameStatus, switchTurn } from "./gameFlow";

function shotFiredAt(player, tile) {
  let validShot;

  if (gameStatus === "player1 turn" && tile.player == "player1") {
    validShot = false;
  } else {
    validShot = true;
  }

  if (validShot) {
    if (tile.shot == false && tile.occupied == true) {
      shotHit();
    } else if (tile.shot == false) {
      shotMissed();
    }
  }

  function shotHit() {
    let shipHitID = data[player].shipData.findIndex((obj) => {
      return obj.shipName === tile.shipOccuping;
    });

    data[player].shipData[shipHitID].shipHit();

    tile.markTileShot(true);
    checkWin(player);
  }

  function shotMissed() {
    tile.markTileShot(false);
    lastShot = " has missed... ";
    switchTurn();
  }
}

export { shotFiredAt };
