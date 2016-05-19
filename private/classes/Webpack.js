import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';
import Server from '~/classes/Server';
import config from '~/config/webpack';
import configServer from '~/config/webpack-server';
import { writeFile } from '~/utils/fs';

/**
 *
 * @extends Mixin
 */
export default class Webpack extends Server{
  /**
   * [constructor description]
   * @author THernandez03
   * @param  {[type]} options [description]
   * @return {[type]} [description]
   */
  constructor(options){
    options = {
      config
    , configFile: 'config.js'
    , pidFile: 'webpack.pid'
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
        const server = new WebpackServer(webpack(config), configServer);
        const host = config.host;
        const port = config.port;

        server.listen(port, host, (err) => {
          if(err){ return reject(err); }
          console.log(`Webpack is listening at ${host}:${port}`);
          return resolve();
        });
      }, reject);
    });
  }

  /**
   * [exposeConfig description]
   * @author THernandez03
   * @param  {[type]} path [description]
   * @return {[type]} [description]
   */
  exposeConfig(path){
    let data = JSON.stringify(this.get('config'), (key, val) => {
      return (val instanceof RegExp) ? `_R${val}X_` : val;
    });
    if(!!~data.indexOf('"_R') && !!~data.indexOf('X_"')){
      data = data.replace(/\"\_R/g, '').replace(/X\_\"/g, '');
    }
    data = `module.exports = ${data.replace(/\\\\/g, '\\')};`;
    return writeFile(path || this.get('configFile'), data);
  }
}
