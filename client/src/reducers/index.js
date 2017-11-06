import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import usersReducer from './usersReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  users: usersReducer,
  game: gameReducer
});

export { rootReducer };
