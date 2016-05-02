import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Views from '~/views/';
import Reducers from '~/reducers/';

const store = createStore(
  combineReducers({ ...Reducers, routing: routerReducer })
, {}
, (
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
  ) ? window.devToolsExtension() : (fn) => { return fn }
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/hello' component={Views.Main}/>
      <Route path='*' component={Views.E404}/>
    </Router>
  </Provider>
, document.getElementById('app')
);
