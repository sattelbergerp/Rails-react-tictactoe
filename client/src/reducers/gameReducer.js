export default function usersReducer(state = {
  loading: false,
  inGame: false,
  errors: [],
  current: {},
  timestamp: 0,
  messages: []
}, action){
  switch(action.type){
    case 'ENTER_GAME':
      if(action.payload.errors){
        return {
          loading: false,
          inGame: false,
          errors: action.payload.errors,
          current: {},
          timestamp: 0,
          messages: []
        };
      }else{
        return {
          loading: false,
          inGame: true,
          errors: [],
          current: action.payload.game,
          timestamp: 0,
          messages: []
        };
      }
      case 'UPDATE_GAME':
        if(!state.inGame)return state;
        let loading = action.resetLoading? false : state.loading;
        if(action.payload.errors){
          return {
            loading: loading,
            inGame: true,
            errors: action.payload.errors,
            current: state.current,
            timestamp: state.timestamp,
            messages: state.messages
          };
        }else{
          return {
            loading: loading,
            inGame: true,
            errors: state.errors,
            current: (action.payload.game? action.payload.game : state.current),
            timestamp: action.payload.timestamp? action.payload.timestamp : state.timestamp,
            messages: action.payload.messages? state.messages.concat(action.payload.messages) : state.messages
          };
        }
    case 'EXIT_GAME':
      return {
        loading: false,
        inGame: false,
        errors: [],
        current: {},
        timestamp: 0,
        messages: []
      };
    case 'ENTER_GAME_STARTED':
      return {
        loading: true,
        inGame: false,
        errors: [],
        current: {},
        timestamp: 0,
        messages: []
      };
    case 'UPDATE_GAME_STARTED':
      return {
        loading: true,
        inGame: true,
        errors: [],
        current: state.current,
        timestamp: state.timestamp,
        messages: state.messages
      };
    default:
      return state;
  }
}
