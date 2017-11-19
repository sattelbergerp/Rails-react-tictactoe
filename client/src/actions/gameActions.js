import {NetworkQueue} from './../utils/NetworkQueue';

let networkQueue = new NetworkQueue();

function startHeartbeat(){
  return (dispatch, getState) => {
    setInterval(()=>{
      if(getState().game.inGame && !networkQueue.isBusy() && getState().game.current.id){
        networkQueue.add(doneCB => {
          fetch('/games/'+getState().game.current.id+'.json?since='+getState().game.timestamp, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            method: "GET"
          }).then(res=>res.json())
            .then(res=>{
              dispatch({type: "UPDATE_GAME", payload: res, resetLoading: false});
              doneCB();
          });
        });
      }

    }, 500);
  }
}

function doTurn(position, gameId){
  return dispatch => {
    dispatch({type: 'UPDATE_GAME_STARTED'});
    networkQueue.add(flagDone=>{

      fetch('/games/'+gameId+'/turn.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify({game: {position}})
      }).then(res=>res.json())
        .then(res=>{
          dispatch({type: "UPDATE_GAME", payload: res, resetLoading: true})
          flagDone();
      });
    });
  };
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

function deleteGame(gameId){
  return dispatch => {
    dispatch({type: "EXIT_GAME"})
    fetch('/games/'+gameId+'.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "DELETE"
    });
  };
}

function joinGame(gameId){
  return dispatch => {
    dispatch({type: 'ENTER_GAME_STARTED'});
    fetch('/games/'+gameId+'/join.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "POST"
    }).then(res=>res.json())
      .then(res=>dispatch({type: "ENTER_GAME", payload: res}));
  };
}

//message={contents}
function sendMessage(gameId, message){
  return dispatch => {
    fetch('/games/'+gameId+'/messages.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({message})
    });
  };
}

export { createGame, openGame, joinGame, startHeartbeat, doTurn, deleteGame, sendMessage};
