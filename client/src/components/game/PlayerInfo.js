import React from 'react';
import GameTile from './../../containers/game/GameTile.js'

export default (props) => {
  return (<div className={"inline-block" + (props.right?" right":" left")}>

      <div className={"inline-block" + (props.right?" right":" left")}>
        <GameTile tile={props.game['player'+props.playerIndex+'_tile']} clickable={false} size={48}/>
      </div>
      <div className="player-info-text">
      { props.game['player'+props.playerIndex]? props.game['player'+props.playerIndex].email : ""}<br/>
      Wins: { props.game['player'+props.playerIndex+'_wins']}
      </div>
    </div>);
}
