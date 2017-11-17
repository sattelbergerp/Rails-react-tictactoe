function fetchUser(userId){
  return dispatch => {
    dispatch({type: 'FETCH_USER_STARTED'});
    fetch('/users/'+userId+'.json', {credentials: "same-origin"}).then(res=>res.json())
      .then(res=>{dispatch({type: "FETCH_USER", payload: res.user})});
  };
}

function fetchUsers(offset, clear){
  return dispatch => {
    if(clear)dispatch({type: 'CLEAR_USERS'});
    dispatch({type: 'FETCH_USERS_STARTED'});
    fetch('/users.json', {credentials: "same-origin"}).then(res=>res.json())
      .then(res=>{dispatch({type: "FETCH_USERS", users: res.users, users_page_size: res.users_page_size})});
  };
}

export { fetchUser, fetchUsers };
