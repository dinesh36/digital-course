import { NextRequest } from 'next/server';
import { middleware as ssrMiddleware } from '@/ecom/ssr-utils';

export async function middleware(request: NextRequest) {
  return ssrMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api/|.*\\.(?:json|js|css|ttf|ico|png|jpg|jpeg|gif|svg|webp)$).*)',
  ],
};
