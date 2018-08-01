import React from 'react';

const ReactComponent = (props) => (
  <button 
    id={props.id} 
    className="grid__box" 
    onClick={props.boxClick}
    disabled={props.gameOver}
  >
    {!!props.boxContent && <p>{props.boxContent}</p>}
  </button>
);

export default ReactComponent;