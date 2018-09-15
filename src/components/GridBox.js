import React from 'react';

const GridBox = (props) => (
  <button 
    id={props.id} 
    className="grid__box" 
    onClick={props.boxClick}
    disabled={props.boxDisabled || !!props.boxContent}
  >
    {!!props.boxContent && <p>{props.boxContent}</p>}
  </button>
);

export default GridBox;