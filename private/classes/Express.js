import helmet from 'helmet';
import express from 'express';
import hogan from 'hogan-express';
import compression from 'compression';
import bodyParser from 'body-parser';
import Server from '~/classes/Server';
import Router from '~/classes/Router';
import config from '~/config/express-server';
import * as envs from '~/config/envs';

/**
 * Describe a Express server
 */
export default class Express extends Server{
  /**
   * [constructor description]
   * @author THernandez03
   * @param  {[type]} options [description]
   * @return {[type]} [description]
   */
  constructor(options){
    options = {
      pidFile: 'express.pid'
    , ...options
    };
    super(options);
  }

  /**
   * [run description]
   * @author THernandez03
   * @param  {[type]} force [description]
   * @return {[type]} [description]
   */
  run(force){
    return new Promise((resolve, reject) => {
      super.run(force).then(() => {
        const app = express();
        const router = new Router();
        const port = config.port;

        app.set('views', './private');
        app.set('view engine', 'html');
        app.engine('html', hogan);
        app.use(helmet());
        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static('./public', { maxAge: 31557600000 }));
        if(!envs.__PROD__){
          app.use(helmet.noCache());
        }else{
          app.use(helmet.hsts({
            force: true
          , maxAge: 2592000000
          , includeSubDomains: true
          }));
          app.use(helmet.contentSecurityPolicy({
            defaultSrc: [`'self'`]
          , fontSrc: [`'self'`]
          , imgSrc: [`'self'`, 'data:']
          , scriptSrc: [
              `'self'`
            , `'unsafe-inline'`
            , `'unsafe-eval'`
            , 'http://*.facebook.com/'
            , 'https://*.facebook.com/'
            , 'https://*.google-analytics.com'
            , 'http://*.google-analytics.com'
          ]
          , styleSrc: [
              `self'`
            , `'unsafe-inline'`
            , 'http://*.facebook.com/'
            , 'https://*.facebook.com/'
            , 'https://*.google-analytics.com'
            , 'http://*.google-analytics.com'
          ]
          }));
        }

        app.use('/', router);

        app.listen(port, (err) => {
          if(err){ return reject(err); }
          console.log(`Express is listening at ${port}`);
          return resolve();
        });
      }, reject);
    });
  }
}
