import { data } from "./storeData";
import { shipPlacementComplete } from "./gameFlow";
import { replaceRotateTiles } from "./rotateRelated";

function placeShipOnTiles(player, shipID) {
  if (!checkIfAllPlaced(player)) {
    currentPlacedShip(shipID);
    replaceRotateTiles();
  } else {
    shipPlacementComplete();
  }

  function checkIfAllPlaced(player) {
    let amountPlaced = 0;

    data[player].shipData.forEach((element) => {
      if (element.placed == true) {
        amountPlaced++;
      }
    });

    return amountPlaced === 5 ? true : false;
  }
}

function currentPlacedShip(shipID) {
  data["globalData"].currentPlacedShipID = shipID;
}

function getCurrentPlacedShip() {
  return data["globalData"].currentPlacedShipID;
}

function isPlacementValid(info) {
  let mainTileObj = data[info.player].gameBoardData[info.tileID];
  let affectedTiles = [];
  if (checkSpace() && checkOccupied()) {
    affectedTiles.forEach((val) => setOccupyTiles(val));
    return true;
  } else {
    return false;
  }

  function setOccupyTiles(val) {
    let neededDataGB = data[info.player].gameBoardData[val];
    let thisShip = data[info.player].shipData[info.currentShipID];

    neededDataGB.occupied = true;
    neededDataGB.updateTileOccupied(info.player);
    neededDataGB.shipOccuping = thisShip.shipName;

    thisShip.placed = true;
  }

  function checkSpace() {
    if (info.shipAxis === "vertical") {
      return checkSpaceAxis("yPos");
    } else {
      return checkSpaceAxis("xPos");
    }

    function checkSpaceAxis(axis) {
      if (mainTileObj.position[axis] + (info.shipLength - 1) > 10) {
        return false;
      } else {
        pushAffectedTiles();
        return true;
      }
    }
  }

  function pushAffectedTiles() {
    let xPosInit = mainTileObj.position["xPos"],
      yPosInit = mainTileObj.position["yPos"];

    for (let i = 0; i < info.shipLength; i++) {
      affectedTiles.push(filterFind(xPosInit, yPosInit));
      info.shipAxis == "vertical" ? yPosInit++ : xPosInit++;
    }
  }

  function checkOccupied() {
    let isOccupied = false;

    affectedTiles.forEach((val) => cycleArrForOccupied(val));

    function cycleArrForOccupied(val) {
      let startY = data[info.player].gameBoardData[val].position["yPos"] - 1,
        startX = data[info.player].gameBoardData[val].position["xPos"] - 1;

      for (let x = startX; x < startX + 3; x++) {
        for (let y = startY; y < startY + 3; y++) {
          if (
            data[info.player].gameBoardData[filterFind(x, y)]["occupied"] ==
            true
          ) {
            isOccupied = true;
          }
        }
      }
    }

    if (isOccupied == false) {
      return true;
    } else {
      return false;
    }
  }
  function filterFind(x, y) {
    if (x <= 0) {
      x = 1;
    }

    if (y <= 0) {
      y = 1;
    }

    if (x > 10) {
      x = 10;
    }

    if (y > 10) {
      y = 10;
    }
    let filterFind = data[info.player].gameBoardData;
    const filtered = filterFind.filter((obj) => {
      return obj.position["xPos"] === x && obj.position["yPos"] === y;
    });
    return filtered[0].index;
  }
}

function cycleToNextShip(player) {
  let cycleShipID = data["globalData"].currentPlacedShipID;

  cycleShipID++;

  placeShipOnTiles(player, cycleShipID);
}

export {
  placeShipOnTiles,
  getCurrentPlacedShip,
  isPlacementValid,
  cycleToNextShip,
};
