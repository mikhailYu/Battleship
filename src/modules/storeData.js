const data = {
  player1: { gameBoardData: [], domData: [], shipData: [] },
  player2: { gameBoardData: [], domData: [], shipData: [] },
  globalData: { currentPlacedShipID: 0 },
};

let lastShot = "";

let playerName = "";

function resetPlacedShip() {
  data["globalData"].currentPlacedShipID = 0;
}

export { data, resetPlacedShip, playerName };
