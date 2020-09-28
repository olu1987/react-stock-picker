import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducer from './rootReducers';

const middleware = [
  promiseMiddleware,
  thunk
];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

/* eslint-disable no-underscore-dangle */
const configureStore = initialState => createStoreWithMiddleware(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */


export default configureStore();
