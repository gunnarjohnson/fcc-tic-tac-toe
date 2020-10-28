import React from 'react';
import Copyright from './Copyright';
import GameOptions from './GameOptions';
import GridBox from './GridBox';

class TicTacToe extends React.Component {
  state = {
    user: '',
    mode: '',
    mark: 'X',
    markSelected: false,
    turn: 1,
    boxContent: {},
    boxDisabled: true,
    gameCurrent: [
      { 1: undefined, 2: undefined, 3: undefined },
      { 4: undefined, 5: undefined, 6: undefined },
      { 7: undefined, 8: undefined, 9: undefined },
      { 1: undefined, 4: undefined, 7: undefined },
      { 2: undefined, 5: undefined, 8: undefined },
      { 3: undefined, 6: undefined, 9: undefined },
      { 1: undefined, 5: undefined, 9: undefined },
      { 3: undefined, 5: undefined, 7: undefined }
    ],
    gameInit: true,
    gameOptions: true,
    gameOver: false,
    resetMsg: ''
  }

  boxNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    boxId = isNaN(e) ? e.target.id : e;

    // Add mark (X or O) to box content
    boxContent[boxId] = mark;

    // Loop through winning rows
    for (let winRow of gameCurrent) {
      if (boxId in winRow) {
        // Box is in winning row - update current game
        winRow[boxId] = mark;
        let currentRow = Object.keys(winRow);
  
        if (winRow[currentRow[0]] === winRow[currentRow[1]] && winRow[currentRow[1]] === winRow[currentRow[2]]) {
          // Winning row is successfully completed - game over (declare winner)
          gameOptions = true;
          gameOver = true;
          resetMsg = mark + ' wins!';
          break;
        }
      }
    }

    if (!gameOver) {
      if (turn < 9) {
        // Less than 9 turns -> next turn
        turn++;

        // "Toggle" mark
        mark = mark === 'X' ? 'O' : 'X';

        // Check mode and "toggle" user
        if (mode === 'Single Player') {
          if (user === 'Player') {
            user = 'Computer';
            boxDisabled = true;
          } else {
            user = 'Player';
            boxDisabled = false;
          }
        } else if (mode === 'Two Player') {
          user = user === 'Player 1' ? 'Player 2' : 'Player 1';
        }
      } else {
        // More than 9 turns -> game over (declare draw)
        gameOptions = true;
        gameOver = true;
        resetMsg = "It's a draw!";
      }
    }

    // Update state
    this.setState({
      user,
      mark,
      turn,
      boxContent,
      boxDisabled,
      gameCurrent,
      gameOptions,
      gameOver,
      resetMsg
    });
  };

  resetGame = () => {
    this.setState({
      user: '',
      mode: '',
      mark: 'X',
      markSelected: false,
      turn: 1,
      boxContent: {},
      boxDisabled: true,
      gameCurrent: [
        { 1: undefined, 2: undefined, 3: undefined },
        { 4: undefined, 5: undefined, 6: undefined },
        { 7: undefined, 8: undefined, 9: undefined },
        { 1: undefined, 4: undefined, 7: undefined },
        { 2: undefined, 5: undefined, 8: undefined },
        { 3: undefined, 6: undefined, 9: undefined },
        { 1: undefined, 5: undefined, 9: undefined },
        { 3: undefined, 5: undefined, 7: undefined }
      ],
      gameInit: true,
      gameOptions: true,
      gameOver: false,
      resetMsg: ''
    });
  };

  modeSinglePlayer = () => {
    this.setState({ 
      mode: 'Single Player',
      gameInit: false
    });
  };

  modeTwoPlayer = () => {
    this.setState({ 
      mode: 'Two Player',
      markSelected: true,
      boxDisabled: false,
      gameOptions: false,
      gameInit: false
    });
  };

  userSelectO = () => {
    this.setState({
      user: 'Computer',
      markSelected: true,
      gameOptions: false
    });
  };

  userSelectX = () => {
    this.setState({
      user: 'Player',
      markSelected: true,
      boxDisabled: false,
      gameOptions: false
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
      <div className="app">
        <h1 className="app__title">Tic Tac Toe</h1>
        <div className="grid">
          {this.state.gameOptions && 
            <GameOptions 
              gameInit={this.state.gameInit}
              markSelected={this.state.markSelected}
              mode1P={this.modeSinglePlayer}
              mode2P={this.modeTwoPlayer}
              gameOver={this.state.gameOver}
              resetGame={this.resetGame}
              resetMsg={this.state.resetMsg}
              selectO={this.userSelectO}
              selectX={this.userSelectX}
            />
          }
          {this.boxNumbers.map((boxNumber) =>
            <GridBox
              id={boxNumber}
              boxClick={this.boxClick}
              boxDisabled={this.state.boxDisabled}
              boxContent={this.state.boxContent[boxNumber]}
            />
          )}
        </div>
        <Copyright />
      </div>
    );
  }
}

export default TicTacToe;
