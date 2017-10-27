import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducer';
import thunk from 'redux-thunk';

const logger = createLogger({
    predicate: (getState, action) => { return __DEV__},
    duration: true,
});

const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
