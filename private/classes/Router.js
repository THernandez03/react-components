import express from 'express';
import Class from './Class';
import { mixin } from '../utils/mixin';
import packageJson from '../../package.json';
import webpackConfig from '../config/webpack';

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
    , devPath: `http://${webpackConfig.host}:${webpackConfig.port}`
    , ...options
    };
    super(options);
    const router = this.set('router', this.supers[0]);

    this.addRoutes('get'
    , '/version'
    , 'getVersion'
    , 'sendResponse'
    );
    this.addRoutes('get'
    , '/*'
    , (req, res) => {
        res.render('index', { path: webpackConfig.output.publicPath });
      }
    );

    return router;
  }


  addRoutes(method, url, ...middlewares){
    const router = this.get('router');
    router[method](...[url, ...middlewares.map((middleware) => {
      return (...args) => {
        const fn = this[middleware] || middleware;
        return fn.apply(this, args);
      }
    })]);
  }

  /**
   * [sendResponse description]
   * @author THernandez03
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]} [description]
   */
  sendResponse(req, res) {
    return res.status(200).json(req.response);
  }

  /**
   * [getVersion description]
   * @author THernandez03
   * @param  {Function} req [description]
   * @param  {Function} res [description]
   * @param  {Function} next [description]
   * @return {[type]} [description]
   */
  getVersion(req, res, next) {
    req.response = {
      started: this.get('started').toISOString()
    , uptime: (new Date()).getTime() - this.get('started').getTime()
    , version: packageJson.version
    , author: {
        name: packageJson.author.name
      , email: packageJson.author.email
      , url: packageJson.author.url
      }
    };
    next();
  }
}
