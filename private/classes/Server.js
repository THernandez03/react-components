import fs from 'fs';
import path from 'path';
import Class from './Class';
import { writeFile, tmpDir } from '../utils/fs';

/**
 * Describe a Server
 */
export default class Server extends Class{
  /**
   * constructor of the class
   * @method constructor
   * @param  {[type]}    options [description]
   * @return {[type]}            [description]
   */
  constructor(options){
    options = {
      pidFile: 'server.pid'
    , ...options
    };
    super(options);

    const pidFile = this.get('pidFile');

    process
      .on('SIGUSR1', process.exit)
      .on('SIGTERM', process.exit)
      .on('SIGPIPE', process.exit)
      .on('SIGHUP', process.exit)
      .on('SIGINT', process.exit)
      .on('SIGBREAK', process.exit)
      .on('exit', () => {
        fs.access(pidFile, fs.F_OK, (err) => {
          if(err){ throw new Error(err); }
          fs.unlink(pidFile);
        });
      })
      .on('uncaughtException', (err) => {
        if(err.code === 'EADDRINUSE'){
          this.stop().then(process.exit, process.exit);
        }
      })
    ;
  }

  /**
   * [run description]
   * @method run
   * @param  {[type]} force = false [description]
   * @return {[type]} [description]
   */
  run(force = false){
    return new Promise((resolve, reject) => {
      writeFile(
        path.join(tmpDir, this.get('pidFile'))
      , process.pid
      , !force
      ).then(resolve, (err) => {
        if(err.code === 'FEXIST'){
          this.stop().then(() => {
            this.run(true).then(reject, reject);
          }, reject);
        }
      });
    });
  }

  /**
   * [stop description]
   * @method stop
   * @return {[type]} [description]
   */
  stop(){
    return new Promise((resolve, reject) => {
      const pidFile = this.get('pidFile');
      fs.readFile(
        path.join(tmpDir, pidFile)
      , 'utf-8'
      , (err, data) => {
          if(err){ return reject(); }
          try{
            process.kill(data);
            fs.unlink(pidFile);
          }finally{
            return resolve();
          }
        }
      );
    });
  }
}
