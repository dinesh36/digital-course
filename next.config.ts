import type { NextConfig } from 'next';
import getConfig from '@/ecom/ecom-config';
import pkg from './package.json';

const nextConfig: NextConfig = getConfig(pkg.version);

export default nextConfig;
