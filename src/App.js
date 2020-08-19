import React, { useState } from 'react';
import './App.css';
import Tile from './tile/tile'

function App() {
  let defaultBoard = [...new Array(3)].map(() => Array(3).fill(null));
  let [ boardState, updateBoard ] = useState(defaultBoard);
  let [ playerState, updatePlayerState ] = useState("X");
  let [ playerMoves, updatePlayerMoves ] = useState(0);

  let playerActionHandler = (x, y) => {
    console.log(x, y, boardState, playerState);
    let tempBoard = [...boardState];
    tempBoard[y][x] = playerState;
    updateBoard(tempBoard);
    updatePlayerState((playerState === "X") ? "O" : "X" );
    updatePlayerMoves(playerMoves + 1);
    checkBoard(tempBoard);
    console.log(x, y, boardState, playerState);
  }

  let checkBoard = (tempBoard) => {
    // Horozontally
    console.log('eval', tempBoard[0][0], tempBoard[0][1], tempBoard[0][2])
    for(let i = 0; i <= tempBoard.length -1; i++) {
      if(tempBoard[i][0] && tempBoard[i][0] == tempBoard[i][1] && tempBoard[i][1] == tempBoard[i][2]) {
        alertUser(tempBoard[i][0]);
        return;
      }
    }
    // Vertically
    for(let i = 0; i <= tempBoard.length -1; i++) {
      console.log(tempBoard[0][i], tempBoard[1][i], tempBoard[2][i]);
      if(tempBoard[0][i] && tempBoard[0][i] === tempBoard[1][i] && tempBoard[1][i] === tempBoard[2][i]) {
        alertUser(tempBoard[0][i]);
        return;
      }
    }

    // Diagonally
    if(tempBoard[0][0] && tempBoard[0][0] === tempBoard[1][1] && tempBoard[1][1] === tempBoard[2][2]) {
      alertUser(tempBoard[0][0]);
      return;
    }

    // Diagonally
    if(tempBoard[0][2] && tempBoard[0][2] === tempBoard[1][1] && tempBoard[1][1] === tempBoard[2][0]) {
      alertUser(tempBoard[0][2]);
      return;
    }
    if(playerMoves >= 8) {
      alertUser();
    }

  }

  let alertUser = (player) => {
    if(player) {
      alert(`Player ${player} has won the game`);
    } else {
      alert("Draw!!");
    }
  }

  let generateBoard = (rows) => {

    let board = rows.map((row, index) => {
      return (
        <div className="row">
          { generateColumns(row, index) }
        </div>
      )
    })
    return board;
  }

  let generateColumns = (row, y) => {

    let columns = row.map((column, x) => {
      return (
        <Tile 
          y={y} 
          x={x}
          />
      )
    });
    return columns;
  }

  let clicked = (e) => {
    console.dir(e.target);
    if(e.target) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      e.target.className += (playerState === "X") ? " cross" : " circle";
      e.target.innerHTML = `<span>${playerState}</span>`;
      playerActionHandler(x, y);

    }
  }


  let board = generateBoard(boardState || defaultBoard);
  return (
    <div className="App">
      <div className="board" onClick={(e) => {clicked(e)}}>
       { board }
      </div>
    </div>
  );
}
export default App;
