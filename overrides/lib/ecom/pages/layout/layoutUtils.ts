const BREADCRUMB_EXCLUDED_PREFIXES = ['/checkout'];
export const isPathAllowedForBreadcrumb = (pathName: string): boolean => (
  !BREADCRUMB_EXCLUDED_PREFIXES.some((prefix) => pathName.startsWith(prefix))
);

const FULL_SCREEN_ALLOWED_PAGES = ['/checkout/success', '/print-layout', '/blogs/', '/courses/'];
export const isFullScreenLayout = (pathName: string): boolean => (
  pathName === '' || pathName === '/' || FULL_SCREEN_ALLOWED_PAGES.some((prefix) => pathName.startsWith(prefix))
);
