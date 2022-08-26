import { data, lastShot } from "./storeData";

function Ship(shipName, length) {
  return {
    shipName: shipName,
    length: length,
    sunk: false,
    placed: false,
    position: [],
    axis: "vertical",
    health: length,
    shipHit() {
      this.health--;
      this.isSunk();
    },
    isSunk() {
      this.health <= 0 ? (this.sunk = true) : (this.sunk = false);

      if (this.health <= 0) {
        this.sunk = true;
        lastShot = " has sunk the " + this.shipName + "!!! ";
      } else {
        this.sunk = false;
        lastShot = " has hit the " + this.shipName + "! ";
      }
    },
  };
}

function createShipObjs(player) {
  const carrier = new Ship("Carrier", 5);
  const battleship = new Ship("Battleship", 4);
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submarine", 3);
  const destroyer = new Ship("Destroyer", 2);

  data[player].shipData.push(
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer
  );
}

export { Ship, createShipObjs };
