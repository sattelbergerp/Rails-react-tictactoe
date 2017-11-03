function fetchUser(userId){
  return dispatch => {
    dispatch({type: 'FETCH_USER_STARTED'});
    fetch('/users/'+userId+'.json', {credentials: "same-origin"}).then(res=>res.json())
      .then(res=>{dispatch({type: "FETCH_USER", payload: res.user})});
  };
}

export { fetchUser };
