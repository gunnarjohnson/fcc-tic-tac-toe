import React from 'react';

const Button = (props) => (
  <button className="game-options__button" onClick={props.action}>
    {props.content}
  </button>
);

export default Button;
