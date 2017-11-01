import { combineReducers } from 'redux';

import login from 'app/views/Login/modules/reducers';
import launch from 'app/views/Launch/modules/reducers';
import tasks from 'app/views/Tasks/modules/reducers';
import submissions from 'app/views/Submissions/modules/reducers';

const rootReducer = combineReducers({
    login,
    launch,
    tasks,
    submissions,
});

export default rootReducer;
