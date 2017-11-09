export default function usersReducer(state = {
  loading: false,
  errors: [],
  list: []
}, action){
  switch(action.type){
    case 'FETCH_GAMES':
      return {
        loading: false,
        errors: [],
        list: action.payload.games
      };
    case 'FETCH_GAMES_STARTED':
      return {
        loading: true,
        errors: [],
        list: []
      };
    default:
      return state;
  }
}
