require('babel-core/register');
var Webpack = require('./private/classes/Webpack').default
  , Server = new Webpack({ pidFile: 'reactComponents-webpack.pid' })
;

Server.run();
