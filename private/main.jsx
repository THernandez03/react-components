import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Main from './components/views/Main.jsx';
import E404 from './components/views/E404.jsx';

import * as reducers from './components/dumb/Welcome/reducers';

const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer })
, {}
, typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/hello' component={Main}/>
      <Route path='*' component={E404}/>
    </Router>
  </Provider>
, document.getElementById('app')
);
