export default function accountReducer(state={
  loggedIn: false,
  loading: false,
  errors: [],
  user: {}
}, action){
  let loadingState = {loggedIn: false,
    loading: true,
    errors: [],
    user: {}};

  switch(action.type){
    case "SIGN_IN":
      if(!action.payload){
        return {loggedIn: false,
          loading: false,
          errors: [],
          user: {}};
      }else if(action.payload.error){
        return {loggedIn: false,
          loading: false,
          errors: [action.payload.error],
          user: {}};
      }else{
        return {loggedIn: true,
          loading: false,
          errors: [],
          user: action.payload};
      }
    case 'SIGN_UP':
      if(!action.payload.errors){
        return {loggedIn: true,
          loading: false,
          errors: [],
          user: action.payload};
      }else{
        return {loggedIn: false,
          loading: false,
          errors: Object.keys(action.payload.errors).map((key)=>{
            return key + ': ' + action.payload.errors[key][0];
          }),
          user: {}};
      }
    case 'UPDATE':
      return {loggedIn: true,
        loading: false,
        errors: [],
        user: action.payload};
    case 'SIGN_IN_STARTED':
      return loadingState;
    case 'SIGN_UP_STARTED':
      return loadingState;
    case 'SIGN_OUT_STARTED':
      return loadingState;
    case 'UPDATE_STARTED':
      return {loggedIn: true,
        loading: true,
        errors: [],
        user: state.user,};
    case 'SIGN_OUT':
    return {loggedIn: false,
      loading: false,
      errors: [],
      user: {}};
    case 'CLEAR_ERRORS':
    return {loggedIn: state.loggedIn,
      loading: false,
      errors: [],
      user: state.user};
    default:
      return state;
  }
}
