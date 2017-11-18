import React from 'react';
import GameTile from './../../containers/game/GameTile.js'
import { Link } from 'react-router-dom';

export default (props) => {
  let player = props.game['player'+props.playerIndex];

  return (<div className={"inline-block" + (props.right?" right":" left")}>

      <div className={"inline-block" + (props.right?" right":" left")}>
        <GameTile tile={props.game['player'+props.playerIndex+'_tile']} clickable={false} size={48}/>
      </div>
      <div className="player-info-text">
      {player ? <Link to={"/games/"+props.game.id+"/users/"+player.id} >{player.display_name}</Link> : ""}<br/>
      Wins: { props.game['player'+props.playerIndex+'_wins']}
      </div>
    </div>);
}
