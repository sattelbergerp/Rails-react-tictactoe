import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import usersReducer from './usersReducer';
import gameReducer from './gameReducer';
import gamesReducer from './gamesReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  users: usersReducer,
  game: gameReducer,
  games: gamesReducer
});

export { rootReducer };
