import path from 'path';
import webpack from 'webpack';
import * as envs from './envs';

const configs = {
  local: {
    host: '127.0.0.1'
  , port: 4000
  , plugins: [
      new webpack.HotModuleReplacementPlugin()
    , new webpack.NoErrorsPlugin()
    ]
  }
};
const defaultConfig = {
  entry: {
    main: ['./private/main.jsx']
  }
, output: {
    publicPath: '/'
  , path: 'public/'
  , filename: '[name].js'
  }
, module: {
    loaders: [{
      loaders: ['babel?cacheDirectory']
    , test: /\.jsx?$/
    , exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/
    , loader: 'style-loader!css-loader'
    }]
  }
, resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

let config = { ...defaultConfig, ...configs[envs.__ENV__]};

if(envs.__LOCAL__){
  let publicPath = `${config.host}:${config.port}`;
  if(config.port === 443){
    publicPath = `https://${publicPath}/`;
  }else{
    publicPath = `http://${publicPath}/`;
  }
  config.debug = true;
  config.devtool = 'cheap-source-map';
  config.module.loaders[0].loaders.splice(0, 0, 'react-hot');
  config.output = {
    ...config.output
  , publicPath
  , devtoolModuleFilenameTemplate: 'webpack:///[moduleId]'
  , path: `${path.dirname(__dirname)}/${config.output.path}`
  }
  config.entry.main = [
    `webpack-dev-server/client?${publicPath.slice(0, -1)}`
  , 'webpack/hot/only-dev-server'
  , ...config.entry.main
  ];
}

export default config;