function fetchUser(userId){
  return dispatch => {
    dispatch({type: 'FETCH_USER_STARTED'});
    fetch('/users/'+userId+'.json', {credentials: "same-origin"}).then(res=>res.json())
      .then(res=>{dispatch({type: "FETCH_USER", payload: res.user})});
  };
}

function updateUser(userId){
  return dispatch => {
    dispatch({type: 'UPDATE_USER_STARTED'});
    fetch('/users/'+userId+'/vote.json', {credentials: "same-origin", method: "POST"}).then(res=>res.json())
      .then(res=>{dispatch({type: "UPDATE_USER", payload: res.user})});
  };
}

function fetchUsers(offset, clear){
  if(!offset)offset='0';
  return dispatch => {
    if(clear)dispatch({type: 'CLEAR_USERS'});
    dispatch({type: 'FETCH_USERS_STARTED'});
    fetch('/users.json?offset='+offset, {credentials: "same-origin"}).then(res=>res.json())
      .then(res=>{dispatch({type: "FETCH_USERS", users: res.users, users_page_size: res.page_size, users_count: res.count})});
  };
}

export { fetchUser, fetchUsers, updateUser };
