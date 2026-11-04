import getConfig from '@/ecom/ecom-config';
import pkg from './package.json';

// The config is in the lib (`getConfig`): the rewrite of `/api/*` to the backend for local use is there too.
export default getConfig(pkg.version);
