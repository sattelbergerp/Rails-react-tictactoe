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
        let loading = action.resetLoading? false : state.loading;
        if(action.payload.errors){
          return {
            loading: loading,
            inGame: true,
            errors: action.payload.errors,
            current: state.current
          };
        }else{
          return {
            loading: loading,
            inGame: true,
            errors: state.errors,
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
    case 'UPDATE_GAME_STARTED':
      return {
        loading: true,
        inGame: true,
        errors: [],
        current: state.current
      };
    default:
      return state;
  }
}
