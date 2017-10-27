import { combineReducers } from 'redux';

import login from 'app/views/Login/modules/reducers';
import launch from 'app/views/Launch/modules/reducers';

const rootReducer = combineReducers({
    login,
    launch,
});

export default rootReducer;
