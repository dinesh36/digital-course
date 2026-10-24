import type { NextConfig } from 'next';
import getConfig from '@/ecom/ecom-config';
import pkg from './package.json';

const baseConfig: NextConfig = getConfig(pkg.version);

// Locally the backend is on another site, and its auth cookie would not be accepted from there. The Next server
// proxies `/api-v2/*` to it (NEXT_PUBLIC_API_V2_URL=/api-v2), so the browser only talks to its own origin.
// A deployed store needs none of this: the tenant's CloudFront sends `/api/*` to the backend.
const backendUrl = process.env.NEXT_ECOM_BACKEND_URL;

const nextConfig: NextConfig = {
  ...baseConfig,
  async rewrites() {
    const existing = await baseConfig.rewrites?.();
    const backendRewrites = backendUrl ? [{ source: '/api-v2/:path*', destination: `${backendUrl}/:path*` }] : [];
    if (!existing) return backendRewrites;
    if (Array.isArray(existing)) return [...existing, ...backendRewrites];
    return { ...existing, afterFiles: [...(existing.afterFiles ?? []), ...backendRewrites] };
  },
};

export default nextConfig;
