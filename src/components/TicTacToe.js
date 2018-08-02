import React from 'react';
import Copyright from './Copyright';
import GameOver from './GameOver';
import GridBox from './GridBox';

class TicTacToe extends React.Component {
  state = {
    mark: 'X',
    turn: 1,
    boxContent: {},
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
    gameOver: false,
    resetMsg: ""
  };

  boxClick = (e) => {
    let boxId = e.target.id;
    let mark = this.state.mark;
    let turn = this.state.turn;
    let boxContent = this.state.boxContent;
    let gameCurrent = this.state.gameCurrent;
    let gameOver = this.state.gameOver;
    let resetMsg = this.state.resetMsg;
    // Add mark (X or O) to box content
    boxContent[boxId] = mark;
    // Loop through winning rows
    for (let winRow of gameCurrent) {
      // Box is in winning row - update current game
      if (boxId in winRow) {
        winRow[boxId] = mark;
        let currentRow = Object.keys(winRow);
        // Winning row is successfully completed - game over (declare winner)
        if (winRow[currentRow[0]] == winRow[currentRow[1]] && winRow[currentRow[1]] == winRow[currentRow[2]]) {
          resetMsg = mark + " wins!";
          gameOver = !gameOver;
          break;
        }
      }
    }
    // Less than 9 turns -> next turn; more than 9 turns -> game over (declare draw)
    if (turn < 9) {
      turn++;
    } else if (!gameOver) {
      resetMsg = "It's a draw!";
      gameOver = !gameOver;
    }
    // "Toggle" mark and update state
    mark == 'X' ? mark = 'O' : mark = 'X';
    this.setState({
      mark, turn, boxContent, gameCurrent, gameOver, resetMsg
    });
  };

  resetGame = () => {
    this.setState({
      mark: 'X',
      turn: 1,
      boxContent: {},
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
      gameOver: false,
      resetMsg: ""
    });
  };

  render() {
    return (
      <div className="app-container">
        <div className="grid">
          {this.state.gameOver && <GameOver resetGame={this.resetGame} resetMsg={this.state.resetMsg} />}
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