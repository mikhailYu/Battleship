import { data } from "./storeData";

const GBOuter = document.querySelector(".bottomGameBoardCont");
const tileBox = document.querySelector(".rotateTileBox");
const rotateBtn = document.querySelector(".rotateButton");
let info;
let rotationVal = 0;
let isRotated = false;

rotateBtn.addEventListener("click", rotateTile);

function hideAllRotate() {
  GBOuter.style.display = "none";
  rotateBtn.style.display = "none";
}

function enableRotate() {
  GBOuter.style.display = "flex";
  rotateBtn.style.display = "flex";
  tileBox.style.display - "flex";
}

function replaceRotateTiles() {
  while (tileBox.firstChild) {
    tileBox.removeChild(tileBox.firstChild);
  }
  createRotateTiles();
}

function rotateTile() {
  getInfo();

  isRotated == false ? (isRotated = true) : (isRotated = false);

  rotationVal += 90;

  let rotStr = "rotate(" + rotationVal + "deg)";
  tileBox.style.transform = rotStr;

  if (info.ship.axis === "vertical") {
    info.ship.axis = "horizontal";
  } else if (info.ship.axis === "horizontal") {
    info.ship.axis = "vertical";
  }
}

function createRotateTiles() {
  getInfo();

  transferRotation();

  for (let i = 0; i < info.length; i++) {
    let newTile = document.createElement("div");
    newTile.classList.add("rotateTile");
    tileBox.appendChild(newTile);
  }
}

function transferRotation() {
  if (isRotated) {
    info.ship.axis = "horizontal";
  }
}

function getInfo() {
  let shipId = data["globalData"].currentPlacedShipID;
  info = {
    length: data["player1"].shipData[shipId].length,
    ship: data["player1"].shipData[shipId],
    shipId: shipId,
  };

  return info;
}

export { hideAllRotate, enableRotate, replaceRotateTiles };
