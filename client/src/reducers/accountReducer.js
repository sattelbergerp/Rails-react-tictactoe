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
    case 'SIGN_IN_STARTED':
      return loadingState;
    case 'SIGN_UP_STARTED':
      return loadingState;
    case 'SIGN_OUT_STARTED':
      return loadingState;
    case 'SIGN_OUT':
    return {loggedIn: false,
      loading: false,
      errors: [],
      user: {}};
    default:
      return state;
  }
}
