import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  users: usersReducer,
});

export { rootReducer };
