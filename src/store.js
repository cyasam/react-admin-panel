import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { setAuthDispatch } from './actions';
import rootReducer from './reducers';
import { checkToken } from './helpers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

if (checkToken()) {
  store.dispatch(setAuthDispatch(true));
}

export default store;
