import React from 'react';

export default (props) => {
  let scale = props.size/140.0;
  let o = (<circle cx={70*scale} cy={70*scale} r={40*scale} fill="#FFFFFF00" strokeWidth={10*scale} stroke="green"></circle>);
  let x = (<div>
      <line x1={20*scale} y1={20*scale} x2={120*scale} y2={120*scale} style={{stroke:"green",strokeWidth:10*scale, strokeLinecap:"round"}} />
      <line x1={120*scale} y1={20*scale} x2={20*scale} y2={120*scale} style={{stroke:"green",strokeWidth:10*scale, strokeLinecap:"round"}} />
    </div>)
  let blank = (<div></div>);
  return (<div className={"board-tile"+ (props.clickable?" enabled":"")}
  style={{width: 140*scale, height: 140*scale}} onClick={props.clickable?props.onClick : undefined} id={props.id}>
    <svg width={140*scale} height={140*scale}>
      {props.tile==="X"? x.props.children : (props.tile==="O"? o : blank)}
    </svg>
  </div>)
}
