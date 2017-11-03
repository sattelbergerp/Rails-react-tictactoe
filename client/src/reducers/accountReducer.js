export default function accountReducer(state={
  loggedIn: false,
  loading: false,
  error: undefined,
  user: {}
}, action){
  let loadingState = {loggedIn: false,
    loading: true,
    error: undefined,
    user: {}};

  switch(action.type){
    case "SIGN_IN":
      if(!action.payload){
        return {loggedIn: false,
          loading: false,
          error: null,
          user: {}};
      }else if(action.payload.error){
        return {loggedIn: false,
          loading: false,
          error: action.payload.error,
          user: {}};
      }else{
        return {loggedIn: true,
          loading: false,
          error: undefined,
          user: action.payload};
      }
    case 'SIGN_IN_STARTED':
      return loadingState;
    case 'SIGN_OUT_STARTED':
      return loadingState;
    case 'SIGN_OUT':
    return {loggedIn: false,
      loading: false,
      error: undefined,
      user: {}};
    default:
      return state;
  }
}
