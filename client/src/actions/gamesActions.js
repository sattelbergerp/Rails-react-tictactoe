function fetchGames(){
  return dispatch => {
    dispatch({type: 'FETCH_GAMES_STARTED'});
    fetch('/games.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "GET"
    }).then(res=>res.json())
      .then(res=>dispatch({type: "FETCH_GAMES", payload: res}));
  };
}

export { fetchGames };
