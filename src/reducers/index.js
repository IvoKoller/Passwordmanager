import { combineReducers } from 'redux';

import database from './databaseReducer';
import state from './stateReducer';

export default combineReducers({
    state,
    database,
})
