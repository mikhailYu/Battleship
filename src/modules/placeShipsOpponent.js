import { data } from "./storeData";

function placeShipsOpponent() {
  let aiShips = data["player2"].shipData;
  let affectedTiles = [];

  aiShips.forEach((ship) => setAiShip(ship));

  function setAiShip(ship) {
    let randPos = generatePos();
    let setAxis = chooseAxis();
    ship.axis = setAxis;
    let mainTileObj = getTileRand(randPos);

    affectedTiles = [];

    if (!validatePos(ship, randPos, mainTileObj)) {
      rerollShip(ship);
    }

    function chooseAxis() {
      if (fiftyFifty() > 4) {
        return "horizontal";
      } else {
        return "vertical";
      }
      function fiftyFifty() {
        return Math.floor(Math.random() * (10 - 1) + 1);
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
      let filterFind = data["player2"].gameBoardData;
      const filtered = filterFind.filter((obj) => {
        return obj.position["xPos"] === x && obj.position["yPos"] === y;
      });
      return filtered[0].index;
    }

    function getTileRand(randPos) {
      let tileIndex = filterFind(randPos["x"], randPos["y"]);
      return data["player2"].gameBoardData[tileIndex];
    }

    function rerollShip(ship) {
      setAiShip(ship);
    }

    function validatePos(ship, randPos, mainTileObj) {
      if (
        checkSpace(ship, randPos, mainTileObj) &&
        checkOccupied(ship, randPos, mainTileObj)
      ) {
        affectedTiles.forEach((val) => setOccupyTiles(val, ship));
        return true;
      } else {
        return false;
      }
    }

    function setOccupyTiles(val, ship) {
      let neededDataGB = data["player2"].gameBoardData[val];

      neededDataGB.occupied = true;

      //neededDataGB.updateTileOccupied("player2");
      // uncheck to see opponent placement

      neededDataGB.shipOccuping = ship.shipName;

      ship.placed = true;
    }

    function checkSpace(ship, randPos, mainTileObj) {
      if (ship.axis === "vertical") {
        return checkSpaceAxis("yPos");
      } else {
        return checkSpaceAxis("xPos");
      }

      function checkSpaceAxis(axis) {
        if (mainTileObj.position[axis] + (ship.length - 1) > 10) {
          return false;
        } else {
          pushAffectedTiles(ship, randPos, mainTileObj);
          return true;
        }
      }

      function pushAffectedTiles(ship, randPos, mainTileObj) {
        let xPosInit = mainTileObj.position["xPos"],
          yPosInit = mainTileObj.position["yPos"];

        for (let i = 0; i < ship.length; i++) {
          affectedTiles.push(filterFind(xPosInit, yPosInit));
          ship.axis == "vertical" ? yPosInit++ : xPosInit++;
        }
      }
    }

    function checkOccupied(ship, randPos, mainTileObj) {
      let isOccupied = false;

      affectedTiles.forEach((val) => cycleArrForOccupied(val));

      function cycleArrForOccupied(val) {
        let startY = data["player2"].gameBoardData[val].position["yPos"] - 1,
          startX = data["player2"].gameBoardData[val].position["xPos"] - 1;

        for (let x = startX; x < startX + 3; x++) {
          for (let y = startY; y < startY + 3; y++) {
            if (
              data["player2"].gameBoardData[filterFind(x, y)]["occupied"] ==
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

    function generatePos() {
      return { x: getRandomNum(), y: getRandomNum() };

      function getRandomNum() {
        return Math.floor(Math.random() * (10 - 1) + 1);
      }
    }
  }
}

export { placeShipsOpponent };
