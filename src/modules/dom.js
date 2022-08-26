import { data, playerName, lastShot } from "./storeData";
import {
  getCurrentPlacedShip,
  isPlacementValid,
  cycleToNextShip,
} from "./placeShips";
import { gameStatus, waitTime } from "./gameFlow";
import { shotFiredAt } from "./shotFired";

let inGameNotifText = document.querySelector(".inGameNotif");

function generateGameboard(player) {
  const gameBoardCont = document.querySelector(".gameBoardsCont");

  const thisGameboardCont = document.createElement("div");
  thisGameboardCont.classList.add("gameBoardOuter");
  gameBoardCont.appendChild(thisGameboardCont);

  data[player].gameBoardData.forEach(forEachTile);

  function forEachTile(tile, index) {
    const tileSpace = document.createElement("div");
    tileSpace.classList.add("tileSpace");
    if (player === "player2") {
      tileSpace.classList.add("opponent");
    }

    tileSpace.addEventListener("click", () => {
      tileClicked(tile, player, index);
    });

    thisGameboardCont.appendChild(tileSpace);

    data[player].domData.push(tileSpace);
  }
}

function tileClicked(tile, player, index) {
  if (gameStatus === "placingShips" && player === "player1") {
    domShipPlacement(player, index);
  } else if (gameStatus === "player1 turn") {
    shotFiredAt("player2", tile);
  }
}

function domShipPlacement(player, tileID) {
  let currentShipID = getCurrentPlacedShip(),
    shipLength = data[player].shipData[currentShipID].length,
    shipAxis = data[player].shipData[currentShipID].axis,
    placementInfo = { player, tileID, currentShipID, shipLength, shipAxis };

  if (isPlacementValid(placementInfo)) {
    cycleToNextShip(player);
  }
}

function switchActiveTiles(player) {
  let getTile = data[player].domData;
  getTile.forEach((tile) => tile.classList.toggle("active"));
}

function inGameNotif(str) {
  inGameNotifText.style.transform = "scale(0)";
  setTimeout(() => {
    inGameNotifText.textContent = str;
    inGameNotifText.style.transform = "scale(1)";
  }, waitTime / 8);
}

function genStr(player) {
  let lastPlayer, nextPlayer;

  if (player === "player1") {
    lastPlayer = playerName;
    nextPlayer = "Computer";
  } else {
    lastPlayer = "Computer";
    nextPlayer = playerName;
  }

  let string = lastPlayer + lastShot + nextPlayer + "'s turn.";

  inGameNotif(string);
}

function deathAnim(loser) {
  let allTiles = data[loser].domData;
  let disp = 10;
  let promise = Promise.resolve();

  allTiles.forEach((tile) => {
    promise = promise.then(function () {
      tile.classList.add("dead");

      return new Promise(function (resolve) {
        setTimeout(resolve, disp);
      });
    });
  });
}

export {
  generateGameboard,
  switchActiveTiles,
  domShipPlacement,
  inGameNotif,
  genStr,
  deathAnim,
};
