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
      method: "POST",
      body: JSON.stringify({user})
    }).then(res=>res.json()).then(res=>dispatch({type: "SIGN_IN", payload: res}));
  };
}

export {signIn};
