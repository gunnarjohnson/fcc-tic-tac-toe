import React from 'react';
import Copyright from './Copyright';
import GameOptions from './GameOptions';
import GridBox from './GridBox';

class TicTacToe extends React.Component {
  state = {
    user: '',
    mode: '',
    mark: 'X',
    turn: 1,
    boxContent: {},
    boxDisabled: true,
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
    gameOptions: true,
    gameInit: true,
    gameOver: false,
    resetMsg: ""
  };

  boxClick = (e) => {
    let boxId;
    let user = this.state.user;
    let mode = this.state.mode;
    let mark = this.state.mark;
    let turn = this.state.turn;
    let boxContent = this.state.boxContent;
    let boxDisabled = this.state.boxDisabled;
    let gameCurrent = this.state.gameCurrent;
    let gameOptions = this.state.gameOptions;
    let gameOver = this.state.gameOver;
    let resetMsg = this.state.resetMsg;
    // Check value
    isNaN(e) ? boxId = e.target.id : boxId = e;    
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
          boxDisabled = true;
          gameOptions = !gameOptions;
          gameOver = !gameOver;
          resetMsg = mark + " wins!";
          break;
        }
      }
    }
    // Less than 9 turns -> next turn; more than 9 turns -> game over (declare draw)
    if (turn < 9) {
      turn++;
    } else if (!gameOver) {
      gameOptions = !gameOptions;
      gameOver = !gameOver;
      resetMsg = "It's a draw!";
    }
    // "Toggle" mark
    mark == 'X' ? mark = 'O' : mark = 'X';
    // Check mode and "toggle" user
    if (mode == 'Single Player') {
      if (user == 'Player') {
        user = 'Computer';
        boxDisabled = true;
      } else {
        user = 'Player';
        boxDisabled = false;
      }
    } else if (mode == 'Two Player') {
      user == 'Player 1' ? user = 'Player 2' : user = 'Player 1';
    }
    // Update state
    this.setState({
      user, mark, turn, boxContent, boxDisabled, gameCurrent, gameOptions, gameOver, resetMsg
    });
  };

  resetGame = () => {
    this.setState({
      user: '',
      mode: '',
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
      gameInit: true,
      gameOver: false,
      reset: false,
      resetMsg: ""
    });
  };

  modeSinglePlayer = () => {
    this.setState({ 
      user: 'Computer',
      mode: 'Single Player',
      gameOptions: false,
      gameInit: false
    });
  };

  modeTwoPlayer = () => {
    this.setState({ 
      mode: 'Two Player',
      boxDisabled: false,
      gameOptions: false,
      gameInit: false
    });
  };

  userSelectX = () => {
    this.setState({
      user: 'X',
      gameOptions: false,
      gameInit: false
    });
  };

  userSelectO = () => {
    this.setState({
      user: 'O',
      gameOptions: false,
      gameInit: false
    });
  };

  computerTurn = () => {
    let computerSelection;
    do {
      computerSelection = Math.floor(Math.random() * 9 + 1);
    }
    while (this.state.boxContent.hasOwnProperty(computerSelection));
    this.boxClick(computerSelection);
  }

  componentDidUpdate() {
    if (!this.state.gameOver) {
      if (this.state.mode === 'Single Player' && this.state.user === 'Computer') {
        setTimeout(() => {
          this.computerTurn();
        }, 1000);
      }
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="grid">
          {this.state.gameOptions && 
            <GameOptions 
              gameInit={this.state.gameInit} 
              mode1P={this.modeSinglePlayer}
              mode2P={this.modeTwoPlayer}
              gameOver={this.state.gameOver}
              resetGame={this.resetGame} 
              resetMsg={this.state.resetMsg} 
            />
          }
          <GridBox id="1" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[1]} />
          <GridBox id="2" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[2]} />
          <GridBox id="3" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[3]} />
          <GridBox id="4" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[4]} />
          <GridBox id="5" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[5]} />
          <GridBox id="6" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[6]} />
          <GridBox id="7" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[7]} />
          <GridBox id="8" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[8]} />
          <GridBox id="9" boxClick={this.boxClick} boxDisabled={this.state.boxDisabled} boxContent={this.state.boxContent[9]} />
        </div>
        <Copyright />
      </div>
    );
  }
}

export default TicTacToe;