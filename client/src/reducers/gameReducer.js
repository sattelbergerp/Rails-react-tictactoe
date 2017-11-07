export default function usersReducer(state = {
  loading: false,
  inGame: false,
  errors: [],
  current: {}
}, action){
  switch(action.type){
    case 'ENTER_GAME':
      if(action.payload.errors){
        return {
          loading: false,
          inGame: false,
          errors: action.payload.errors,
          current: {}
        };
      }else{
        return {
          loading: false,
          inGame: true,
          errors: [],
          current: action.payload.game
        };
      }
      case 'UPDATE_GAME':
        if(action.payload.errors){
          return {
            loading: false,
            inGame: false,
            errors: action.payload.errors,
            current: {}
          };
        }else{
          return {
            loading: false,
            inGame: true,
            errors: [],
            current: action.payload.game
          };
        }
    case 'ENTER_GAME_STARTED':
      return {
        loading: true,
        inGame: false,
        errors: [],
        current: {}
      };
    default:
      return state;
  }
}
