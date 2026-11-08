import getConfig from '@/ecom/ecom-config';
import pkg from './package.json';

// The config is in the lib (`getConfig`): the rewrite of `/api/*` to the backend for local use is there too.
const config = getConfig(pkg.version);

// `NEXT_OUTPUT=export npm run build` writes the whole site as static files to `out/`, to upload to S3 (nothing runs on a server).
// Without it the build is the normal one, for `npm run start`.
export default process.env.NEXT_OUTPUT === 'export' ? { ...config, output: 'export' as const } : config;
