import {NetworkQueue} from './../utils/NetworkQueue';

let networkQueue = new NetworkQueue();

let id = 0;

function startHeartbeat(){
  return (dispatch, getState) => {
    setInterval(()=>{
      if(getState().game.inGame && !networkQueue.isBusy()){
        networkQueue.add(doneCB => {
          fetch('/games/'+getState().game.current.id+'.json', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            method: "GET"
          }).then(res=>res.json())
            .then(res=>{
              doneCB();
              dispatch({type: "UPDATE_GAME", payload: res});
          });
        });
      }

    }, 1000);
  }
}

/** game={name} */
function createGame(game){
  return dispatch => {
    dispatch({type: 'ENTER_GAME_STARTED'});
    fetch('/games.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({game})
    }).then(res=>res.json())
      .then(res=>dispatch({type: "ENTER_GAME", payload: res}));
  };
}

function openGame(gameId){
  return dispatch => {
    dispatch({type: 'ENTER_GAME_STARTED'});
    fetch('/games/'+gameId+'.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "GET"
    }).then(res=>res.json())
      .then(res=>dispatch({type: "ENTER_GAME", payload: res}));
  };
}

export { createGame, openGame, startHeartbeat};
