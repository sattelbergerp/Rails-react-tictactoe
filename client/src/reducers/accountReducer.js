export default function accountReducer(state={
  loggedIn: false,
  loading: false,
  user: {}
}, action){
  switch(action.type){
    default:
      return state;
  }
}
