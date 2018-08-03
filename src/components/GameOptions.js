import React from 'react';

const GameOptions = (props) => (
  <div className="game-options">
    <div className="game-options-container">
      <h2 className="game-options__title game-options__title--init">
        {
          /* Options -> Init: Title */
          props.gameInit && 'Select Mode' 
        }
        {
          /* Options -> Reset: Title */
          props.gameOver && props.resetMsg 
        }
      </h2>
      <button 
        className="game-options__button game-options__button--init" 
        onClick=
        {
          /* Options -> Init: Button 1 else Options -> Reset: Button */
          props.gameInit ? props.mode1P : props.resetGame
        }
      >
        {
          /* Options -> Init: Button 1 */
          props.gameInit && 'Single Player'
        }
        {
          /* Options -> Reset: Button */
          props.gameOver && 'Play again?'
        }
      </button>
      {
        /* Options -> Init: Button 2 */
        props.gameInit && 
        <button 
          className="game-options__button game-options__button--init" 
          onClick={props.mode2P}
        >
          Two Player
        </button>
      }
    </div>
  </div>
);

export default GameOptions;