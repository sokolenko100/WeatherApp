import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from '../reducers/rootReducer.js';

const middleware = [thunk, logger];
const store = createStore(
    rootReducer,
    compose(composeWithDevTools(applyMiddleware(...middleware))),
);
export default store;