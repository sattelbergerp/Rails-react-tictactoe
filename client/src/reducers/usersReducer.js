export default function usersReducer(state = {
  loading: false,
  user: {},
  users: [],
  users_page_size: 0,
}, action){
  switch(action.type){
    case 'FETCH_USER':
      return {
        loading: false,
        user: action.payload,
        users: state.users,
        users_page_size: state.users_page_size
      };
    case 'FETCH_USERS':
      return {
        loading: false,
        user: state.user,
        users: state.users.concat(action.users),
        users_page_size: action.users_page_size
      };
    case 'CLEAR_USERS':
      return {
        loading: false,
        user: state.user,
        users: [],
        users_page_size: 0
      };
    case 'FETCH_USER_STARTED':
      return {
        loading: true,
        user: {},
        users: state.users,
        users_page_size: state.users_page_size
      };
    case 'FETCH_USERS_STARTED':
      return {
        loading: true,
        user: state.user,
        users: state.users,
        users_page_size: state.users_page_size
      };
    default:
      return state;
  }
}
