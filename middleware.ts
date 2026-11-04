// The middleware is in the lib (`@/ecom/ssr-utils`): the file has to be here, and Next reads `config` from it as written (it cannot
// be imported).
export { middleware } from '@/ecom/ssr-utils';

// `api/` (the backend: CloudFront deployed, the proxy in the Next config locally) is API calls: the middleware would answer one
// with a redirect to the home page when the cookie is not valid, and the browser would follow it and report success.
export const config = {
  matcher: [
    '/((?!api/|.*\\.(?:json|js|css|ttf|ico|png|jpg|jpeg|gif|svg|webp)$).*)',
  ],
};
