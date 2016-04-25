module.exports = function(config) {
  config.set({
    basePath: ''
  , frameworks: ['jasmine']
  , files: ['tests/setup.js', 'tests/**/*.spec.js']
  , exclude: []
  , plugins: [
      'karma-jasmine'
    , 'karma-chrome-launcher'
    , 'karma-phantomjs-launcher'
    , 'karma-babel-preprocessor'
    ]
  , preprocessors: {
      'tests/**/*.spec.js': ['babel']
    }
  , reporters: ['dots']
  , port: 9876
  , colors: true
  , logLevel: config.LOG_INFO
  , autoWatch: true
  , browsers: ['Chrome', 'PhantomJS']
  , singleRun: false
  , concurrency: Infinity
  });
}
