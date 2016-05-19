import { __ENV__ } from '~/config/envs';

const configs = {
  local: {
    port: 3001
  }
, development: {
    port: 80
  }
, production: {
    port: 80
  }
};

export default configs[__ENV__];
