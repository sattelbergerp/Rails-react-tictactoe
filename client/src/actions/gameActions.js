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

export { createGame };
