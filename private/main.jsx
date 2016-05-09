import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk';

import Reducers from '~/reducers/';
import App from '~/App';

const initialState = window.__InitialState;
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(Reducers, initialState, (
  typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined'
) ? window.devToolsExtension() : (fn) => { return fn });
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <App store={store} history={history}/>
, document.getElementById('app')
);
