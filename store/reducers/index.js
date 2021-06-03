import { combineReducers } from 'redux';
import location from './location';
import bathroom from './bathroom';
import user from './user';

export default combineReducers({
  location,
  bathroom,
  user,
});
