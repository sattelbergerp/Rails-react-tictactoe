import React from 'react';
import GameTile from './GameTile'

export default (props) => {
  return (<div className="board">
      {props.board.map((tile, index)=>{
        return (<GameTile key={index} id={"tile_"+index} tile={tile} />);
      })}
    </div>)
}
