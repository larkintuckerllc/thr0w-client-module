import { combineReducers } from 'redux';
import authenticated from './authenticated';
import channel from './channel';
import connected from './connected';

export default combineReducers({
  authenticated,
  channel,
  connected,
});
