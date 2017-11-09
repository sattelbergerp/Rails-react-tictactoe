import React from 'react';
import GameTile from './GameTile'

export default (props) => {
  return (<div className="board">
      {props.board.map((tile, index)=>{
        return (<GameTile key={index} id={"tile_"+index} tile={tile} onClick={(event) => props.onClick(index, event)} clickable={props.clickable && tile === " "}/>);
      })}
    </div>)
}
