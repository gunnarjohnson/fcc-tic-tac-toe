import React from 'react';

const GridBox = (props) => (
  <button 
    id={props.id} 
    className="grid__box" 
    onClick={props.boxClick}
    disabled={props.boxDisabled || !!props.boxContent}
  >
    {!!props.boxContent && props.boxContent}
  </button>
);

export default GridBox;
