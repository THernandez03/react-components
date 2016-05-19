import { __ENV__ } from './envs';

const configs = {
  local: {
    port: 3000
  }
, development: {
    port: 80
  }
, production: {
    port: 80
  }
};

export default configs[__ENV__];
