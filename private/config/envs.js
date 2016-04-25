const envs = process.env || {};
const argv = process.argv || [];

const prod = 'production';
const dev = 'development';
const local = 'local';
const browser = 'browser';

let env = argv[2] || envs.NODE_ENV || local;

export const __PROD__ = env === prod;
export const __DEV__ = env === dev;

if(!__PROD__ && !__DEV__){
  env = local;
}
if(typeof window === 'object'){
  env = browser;
}

export const __LOCAL__ = env === local;
export const __BROWSER__ = env === browser;
export const __ENV__ = env;
