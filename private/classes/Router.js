import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

import express from 'express';
import Class from '~/classes/Class';
import { mixin } from '~/utils/mixin';
import packageJson from '~/../package.json';
import webpackConfig from '~/config/webpack';

import Reducers from '~/reducers/';
import App from '~/App';

const devPath = (webpackConfig.host) ?
  `http://${webpackConfig.host}:${webpackConfig.port}` : ''
;

/**
 * [mixin description]
 * @extends Mixin
 */
export default class Router extends mixin(Class, express.Router){
  /**
   * [constructor description]
   * @author THernandez03
   * @constructor
   * @param  {[type]} options [description]
   * @return {[type]} [description]
   */
  constructor(options){
    options = {
      started: new Date()
    , devPath
    , ...options
    };
    super(options);
    const router = this.supers[0];

    router.get('/version', this.getVersion.bind(this));
    router.get('/server/*', (req, res) => {
      const memoryHistory = createMemoryHistory(req.path);
      const store = createStore(Reducers, compose(applyMiddleware(thunk)));
      const history = syncHistoryWithStore(memoryHistory, store);
      res.render('index', {
        path: devPath
      , App: renderToString(<App store={store} history={history}/>)
      , initialState: `
          <script>
            window.__InitialState = ${JSON.stringify(store.getState())}
          </script>
        `
      });
    });
    router.get('/*', (req, res) => {
      res.render('index', { path: devPath });
    });

    return router;
  }

  /**
   * [getVersion description]
   * @author THernandez03
   * @param  {Function} req [description]
   * @param  {Function} res [description]
   * @return {[type]} [description]
   */
  getVersion(req, res) {
    res.status(200).json({
      started: this.get('started').toISOString()
    , uptime: (new Date()).getTime() - this.get('started').getTime()
    , version: packageJson.version
    , author: {
        name: packageJson.author.name
      , email: packageJson.author.email
      , url: packageJson.author.url
      }
    });
  }
}
