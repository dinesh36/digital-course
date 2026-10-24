import { NextRequest } from 'next/server';
import { middleware as ssrMiddleware } from '@/ecom/ssr-utils';

export async function middleware(request: NextRequest) {
  return ssrMiddleware(request);
}

// `api/` and `api-v2/` (the local proxy to the backend, see next.config.ts) are API calls: the middleware would answer one
// with a redirect to the home page when the cookie is not valid, and the browser would follow it and report success.
export const config = {
  matcher: [
    '/((?!api/|api-v2/|.*\\.(?:json|js|css|ttf|ico|png|jpg|jpeg|gif|svg|webp)$).*)',
  ],
};
