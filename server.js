require('babel-core/register');
var Express = require('./private/classes/Express').default
  , Server = new Express()
;

Server.run();
