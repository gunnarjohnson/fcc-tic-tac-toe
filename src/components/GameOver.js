import React from 'react';

const GameOver = (props) => (
  <div className="game-over">
    <h2>{props.resetMsg}</h2>
    <button onClick={props.resetGame}>Play again?</button>
  </div>
);

export default GameOver;