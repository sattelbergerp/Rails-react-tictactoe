export default function usersReducer(state = {
  loading: false,
  user: {}
}, action){
  switch(action.type){
    case 'FETCH_USER':
      return {
        loading: false,
        user: action.payload
      };
    case 'FETCH_USER_STARTED':
      return {
        loading: true,
        user: {}
      };
    default:
      return state;
  }
}
