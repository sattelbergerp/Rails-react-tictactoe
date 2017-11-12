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
              dispatch({type: "UPDATE_GAME", payload: res, resetLoading: false});
          });
        });
      }

    }, 1000);
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
    networkQueue.add(flagDone=>{
      dispatch({type: "EXIT_GAME"})
      flagDone();//We don't need to wait for this network request to complete, we jsut need to make sure we are not in the middle of a heartbeat
      fetch('/games/'+gameId+'.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        method: "DELETE"
      });
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

export { createGame, openGame, joinGame, startHeartbeat, doTurn, deleteGame};
