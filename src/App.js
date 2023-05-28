import { useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousClick, setPreviousClick] = useState();

  function handleCardClick(rowIndex, colIndex) {
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick.col];
      if (previousClickNumber !== grid[rowIndex][colIndex]) {
        setTimeout(() => {
          newRevealedGrid[rowIndex][colIndex] = false;
          newRevealedGrid[previousClick.row][previousClick.col] = false;
          setRevealedGrid([...newRevealedGrid]);
        }, 1000);
      } else {
        const hasWon = revealedGrid.flat().every((element) => {
          return element === true;
        });
        if (hasWon) {
          setTimeout(() => {
            alert("You won!");
          }, 500);
        }
      }
      setPreviousClick(undefined);
    } else {
      setPreviousClick({ row: rowIndex, col: colIndex });
    }
  }

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((number, colIndex) => {
                return (
                  <div
                    onClick={() => handleCardClick(rowIndex, colIndex)}
                    className="card"
                    key={colIndex}
                  >
                    {revealedGrid[rowIndex][colIndex] ? number : " "}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
