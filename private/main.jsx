import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk';
import logger from 'redux-diff-logger';

import Reducers from '~/reducers/';
import App from '~/App';

const initialState = window.__InitialState;
const store = createStore(Reducers, initialState, compose(
  applyMiddleware(thunk, logger)
, (
  typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined'
) ? window.devToolsExtension() : (fn) => { return fn }
));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <App store={store} history={history}/>
, document.getElementById('app')
);
