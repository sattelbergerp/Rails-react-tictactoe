export default function usersReducer(state = {
  loading: false,
  user: {},
  users: [],
  users_page_size: 0,
  users_count: 0,
}, action){
  switch(action.type){
    case 'FETCH_USER':
      return {
        loading: false,
        user: action.payload,
        users: state.users,
        users_page_size: state.users_page_size,
        users_count: state.users_count,
      };
    case 'FETCH_USERS':
      return {
        loading: false,
        user: state.user,
        users: state.users.concat(action.users),
        users_page_size: action.users_page_size,
        users_count: action.users_count,
      };
    case 'UPDATE_USER':
    return {
      loading: false,
      user: state.user,
      users: state.users.map((user)=>{
        if(user.id===action.payload.id)return action.payload;
        else return user;
      }),
      users_page_size: state.users_page_size,
      users_count: state.users_count,
    };
    case 'CLEAR_USERS':
      return {
        loading: false,
        user: state.user,
        users: [],
        users_page_size: 0,
        users_count: 0,
      };
    case 'FETCH_USER_STARTED':
      return {
        loading: true,
        user: {},
        users: state.users,
        users_page_size: state.users_page_size,
        users_count: state.users_count,
      };
    case 'FETCH_USERS_STARTED':
      return {
        loading: true,
        user: state.user,
        users: state.users,
        users_page_size: state.users_page_size,
        users_count: state.users_count,
      };
    case 'UPDATE_USER_STARTED':
      return {
        loading: true,
        user: state.user,
        users: state.users,
        users_page_size: state.users_page_size,
        users_count: state.users_count,
      };
    default:
      return state;
  }
}
