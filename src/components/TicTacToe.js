import React from 'react';
import Copyright from './Copyright';
import GridBox from './GridBox';

class TicTacToe extends React.Component {
  state = {
    mark: 'X',
    turn: 1,
    boxContent: {
      1: undefined,
      2: undefined, 
      3: undefined, 
      4: undefined, 
      5: undefined, 
      6: undefined, 
      7: undefined, 
      8: undefined, 
      9: undefined
    },
    gameCurrent: [
      {1: undefined, 2: undefined, 3: undefined},
      {4: undefined, 5: undefined, 6: undefined},
      {7: undefined, 8: undefined, 9: undefined},
      {1: undefined, 4: undefined, 7: undefined},
      {2: undefined, 5: undefined, 8: undefined},
      {3: undefined, 6: undefined, 9: undefined},
      {1: undefined, 5: undefined, 9: undefined},
      {3: undefined, 5: undefined, 7: undefined}
    ],
    gameOver: false
  };

  boxClick = (e) => {
    // Click box
    let boxId = e.target.id;
    let mark = this.state.mark;
    let turn = this.state.turn;
    let boxContent = this.state.boxContent;
    let gameCurrent = this.state.gameCurrent;
    let gameOver = this.state.gameOver;
    if (!boxContent[boxId]) {
      // Box has no content
      boxContent[boxId] = mark;
      for (let winRow of gameCurrent) {
        // Loop through winning rows
        if (boxId in winRow) {
          // Box is in winning row - update current game
          winRow[boxId] = mark;
          let currentRow = Object.keys(winRow);
          if (winRow[currentRow[0]] == winRow[currentRow[1]] && winRow[currentRow[1]] == winRow[currentRow[2]]) {
            // Winning row is successfully completed
            alert(mark + ' wins!');
            gameOver = !gameOver;
            break;
          }
        }
      }
      if (turn < 9) {
        // Less than 9 turns have occurred - go to next turn
        turn++;
      } else if (!gameOver) {
        // 9 turns have occurred with no winning rows successfully completed - game is a draw
        alert("It's a draw!");
        gameOver = !gameOver;
      }
      mark == 'X' ? mark = 'O' : mark = 'X';
      // "Toggle" mark
      this.setState(prevState => ({ 
        // Update state
        mark,
        turn,
        boxContent,
        gameCurrent,
        gameOver
      }));
    } 
  };

  render() {
    return (
      <div className="app-container">
        <div className="grid">
          <GridBox id="1" boxClick={this.boxClick} boxContent={this.state.boxContent[1]} gameOver={this.state.gameOver} />
          <GridBox id="2" boxClick={this.boxClick} boxContent={this.state.boxContent[2]} gameOver={this.state.gameOver} />
          <GridBox id="3" boxClick={this.boxClick} boxContent={this.state.boxContent[3]} gameOver={this.state.gameOver} />
          <GridBox id="4" boxClick={this.boxClick} boxContent={this.state.boxContent[4]} gameOver={this.state.gameOver} />
          <GridBox id="5" boxClick={this.boxClick} boxContent={this.state.boxContent[5]} gameOver={this.state.gameOver} />
          <GridBox id="6" boxClick={this.boxClick} boxContent={this.state.boxContent[6]} gameOver={this.state.gameOver} />
          <GridBox id="7" boxClick={this.boxClick} boxContent={this.state.boxContent[7]} gameOver={this.state.gameOver} />
          <GridBox id="8" boxClick={this.boxClick} boxContent={this.state.boxContent[8]} gameOver={this.state.gameOver} />
          <GridBox id="9" boxClick={this.boxClick} boxContent={this.state.boxContent[9]} gameOver={this.state.gameOver} />
        </div>
        <Copyright />
      </div>
    );
  }
}

export default TicTacToe;