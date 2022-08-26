import { data } from "./storeData";
import { shotFiredAt } from "./shotFired";

let isInfluenced = false;
let rememberedTile;
let reRollCounter = 0;

function getRandomNum() {
  return Math.floor(Math.random() * 99);
}

function fiftyFifty() {
  return Math.floor(Math.random() * 10);
}
function aiStartTurn() {
  let targetTileID;
  let targetTile;

  if (isInfluenced == false) {
    rollNumber();
    checkIfTargetValid();
  } else {
    rollNumberInfluenced();
  }

  function reRollInflu() {
    reRollCounter++;
    if (reRollCounter < 10) {
      rollNumberInfluenced();
    } else {
      reRollNumber();
    }
  }

  function rollNumberInfluenced() {
    let xInflu = rememberedTile.position["xPos"];
    let yInflu = rememberedTile.position["yPos"];

    rollInflu();

    function rollInflu() {
      if (fiftyFifty() > 5) {
        adjustX();
      } else {
        adjustY();
      }
    }

    function adjustX() {
      if (fiftyFifty() > 5) {
        xInflu++;
      } else {
        xInflu--;
      }
      checkValidAdjusted(xInflu, "x");
    }

    function adjustY() {
      if (fiftyFifty() == 0) {
        yInflu++;
      } else {
        yInflu--;
      }
      checkValidAdjusted(yInflu, "y");
    }

    function checkValidAdjusted(val, axis) {
      if (val > 10) {
        if (axis == "x") {
          xInflu = 9;
        } else {
          yInflu = 9;
        }
      } else if (val < 1) {
        if (axis == "x") {
          xInflu = 2;
        } else {
          yInflu = 2;
        }
      }

      targetTileID = filterFind(xInflu, yInflu);

      targetTile = data["player1"].gameBoardData[targetTileID];

      if (targetTile.shot == true) {
        reRollInflu();
      } else {
        fireShot();
      }

      function filterFind(x, y) {
        let filterFind = data["player1"].gameBoardData;
        const filtered = filterFind.filter((obj) => {
          return obj.position["xPos"] === x && obj.position["yPos"] === y;
        });

        return filtered[0].index;
      }
    }
  }

  function rollNumber() {
    targetTileID = getRandomNum();
    targetTile = data["player1"].gameBoardData[targetTileID];
  }

  function reRollNumber() {
    rollNumber();
    checkIfTargetValid();
  }

  function checkIfTargetValid() {
    if (targetTile.shot == true) {
      reRollNumber();
    } else {
      fireShot();
    }
  }

  function fireShot() {
    reRollCounter = 0;
    shotFiredAt("player1", targetTile);
    if (targetTile.occupied == true) {
      rememberedTile = targetTile;
      isInfluenced = true;
    } else {
      isInfluenced = false;
    }
  }
}

export { aiStartTurn };
