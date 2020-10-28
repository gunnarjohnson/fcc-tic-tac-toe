import React from 'react';
import Button from './Button';

const GameOptions = (props) => (
  <div className="game-options">
    <div className="game-options-container">
      <h2 className="game-options__title">
        {
          /* Options -> Init: Title */
          props.gameInit && 'Select Mode' 
        }
        {
          /* Options -> Select Mark */
          !props.gameInit && !props.markSelected && 'Select Mark'
        }
        {
          /* Options -> Reset: Title */
          props.gameOver && props.resetMsg 
        }
      </h2>
      {props.gameInit &&
        <React.Fragment>
          <Button action={props.mode1P} content='Single Player' />
          <Button action={props.mode2P} content='Two Player' />
        </React.Fragment>
      }
      {!props.gameInit && !props.markSelected &&
        <React.Fragment>
          <Button action={props.selectX} content='Select X' />
          <Button action={props.selectO} content='Select O' />
        </React.Fragment>
      }
      {props.gameOver && <Button action={props.resetGame} content='Play again?' />}
    </div>
  </div>
);

export default GameOptions;
