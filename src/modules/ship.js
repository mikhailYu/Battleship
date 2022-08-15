import { data } from "./storeData";
import { gameStatus } from "./gameFlow";

function Ship(shipName, length) {
  return {
    shipName: shipName,
    length: length,
    sunk: false,
    placed: false,
    position: [],
    axis: "vertical",
    hit() {},
    isSunk() {},
  };
}

function createShipObjs(player) {
  const carrier = new Ship("carrier", 5);
  const battleship = new Ship("battleship", 4);
  const cruiser = new Ship("cruiser", 3);
  const submarine = new Ship("submarine", 3);
  const destroyer = new Ship("destroyer", 2);

  data[player].shipData.push(
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer
  );
}

export { Ship, createShipObjs };
