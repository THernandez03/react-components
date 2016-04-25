require('babel-core/register');
var fs = require('fs')
  , child = require('child_process')
  , envs = require('./private/config/envs')
  , Webpack = require('./private/classes/Webpack').default
  , Server = new Webpack()
;

const fork = function(args){
  const file = './node_modules/webpack/bin/webpack.js';
  const cmd = child.fork(file, args);
  cmd.on('exit', function(){
    fs.unlink(path, function(e){
      if(e){ throw e; }
    });
  });
}

if(envs.__PROD__){
  Server.exposeConfig().then(function(path){
    fork(['-p', '--config', __dirname+'/'+path]);
  }, function(e){
    throw e;
  });
}else if(envs.__DEV__){
  Server.exposeConfig().then(function(path){
    fork(['--config', __dirname+'/'+path]);
  }, function(e){
    throw e;
  });
}else{
  Server.run();
}
