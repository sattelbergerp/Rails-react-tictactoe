//user: {email, password}
function signIn(user){
  user = Object.assign({}, {remember_me: 1}, user);
  return dispatch => {
    dispatch({type: 'SIGN_IN_STARTED'});
    fetch('/users/sign_in.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({user})
    }).then(res=>res.json())
      .then(res=>dispatch({type: "SIGN_IN", payload: res}));
  };
}

function signUp(user){
  user = Object.assign({}, {password_confirmation: 'dsg'}, user);
  return dispatch => {
    dispatch({type: 'SIGN_UP_STARTED'});
    fetch('/users.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({user})
    }).then(res=>res.json())
      .then(res=>dispatch({type: "SIGN_UP", payload: res}));
  };
}

function signOut(){
  return dispatch => {
    dispatch({type: 'SIGN_OUT_STARTED'});
    fetch('/users/sign_out.json', {
      credentials: "same-origin",
      method: 'DELETE',
    }).then(res=>res.blob())
      .then(res=>{dispatch({type: "SIGN_OUT"})});
  };
}

function fetchCurrentUser(){
  return dispatch => {
    dispatch({type: 'SIGN_IN_STARTED'});
    fetch('/user.json', {credentials: "same-origin"}).then(res=>res.json())
      .then(res=>{dispatch({type: "SIGN_IN", payload: res.user})});
  };
}

export {signIn, signUp, fetchCurrentUser, signOut};
