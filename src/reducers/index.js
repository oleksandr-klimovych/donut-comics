import { combineReducers } from 'redux';
import notificationReducer from './notification';

export default combineReducers({
    notification: notificationReducer
});
