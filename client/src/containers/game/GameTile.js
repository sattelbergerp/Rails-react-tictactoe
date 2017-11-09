import React from 'react';

export default (props) => {
  let o = (<circle cx="70" cy="70" r="40" fill="#FFFFFF00" strokeWidth="10" stroke="green"></circle>);
  let x = (<div>
      <line x1="20" y1="20" x2="120" y2="120" style={{stroke:"green",strokeWidth:"10", strokeLinecap:"round"}} />
      <line x1="120" y1="20" x2="20" y2="120" style={{stroke:"green",strokeWidth:"10", strokeLinecap:"round"}} />
    </div>)
  let blank = (<div></div>);
  return (<div className="board-tile" onClick={props.clickable?props.onClick : undefined} id={props.id}><div>
    <svg width="140" height="140">
      {props.tile==="X"? x.props.children : (props.tile==="O"? o : blank)}
    </svg>
  </div></div>)
}
