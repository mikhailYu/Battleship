import { data } from "./storeData";
function GameBoard() {
  return {
    setTiles: function (player) {
      function Tile(posObj) {
        return {
          index: data[player].gameBoardData.length,
          position: posObj,
          occupied: false,
          shipOccuping: null,
          shot: false,
          getTile() {
            return position;
          },
          updateTileOccupied() {
            const domTile = data[player].domData[this.index];
            domTile.classList.add("occupied");
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
