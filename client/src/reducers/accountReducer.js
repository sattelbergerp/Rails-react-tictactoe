export default function accountReducer(state={
  loggedIn: false,
  loading: false,
  error: undefined,
  user: {}
}, action){
  switch(action.type){
    case "SIGN_IN":
      if(!action.payload.error){
        return {loggedIn: true,
          loading: false,
          error: undefined,
          user: action.payload};
      }else{
        return {loggedIn: false,
          loading: false,
          error: action.payload.error,
          user: {}};
      }
    case 'SIGN_IN_STARTED':
      return {loggedIn: false,
        loading: true,
        error: undefined,
        user: {}};
    default:
      return state;
  }
}
