import { data } from "./storeData";
function GameBoard() {
  return {
    setTiles: function (player) {
      function Tile(posObj) {
        return {
          player: player,
          index: data[player].gameBoardData.length,
          position: posObj,
          occupied: false,
          shipOccuping: null,
          shot: false,
          getTile() {
            return position;
          },
          updateTileOccupied(player) {
            const domTile = data[player].domData[this.index];
            domTile.classList.add("occupied");
          },
          markTileShot(isHit) {
            const domTile = data[player].domData[this.index];
            this.shot = true;
            domTile.classList.remove("occupied");

            if (isHit == true) {
              domTile.classList.add("hit");
            } else {
              domTile.classList.add("missed");
            }
          },
        };
      }
      for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
          let tile = new Tile({ xPos: x, yPos: y });
          data[player].gameBoardData.push(tile);
        }
      }
    },
  };
}

export default GameBoard;
