import React from 'react';

export default (props) => {
  return (<div className={"current-turn-banner " + props.turn}>
      {props.turn==="your_turn"? "Your Turn" : (props.turn==="opponents_turn"? "Opponents Turn" : "Spectating")}
    </div>);
}
