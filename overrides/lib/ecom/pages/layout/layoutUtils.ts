import { getProductListPath } from '@/ecom/utils/pathUtils';

const FULL_SCREEN_ALLOWED_PAGES = ['/checkout/success', '/print-layout', '/blogs/', `${getProductListPath()}/`];
export const isFullScreenLayout = (pathName: string): boolean => (
  pathName === '' || pathName === '/' || FULL_SCREEN_ALLOWED_PAGES.some((prefix) => pathName.startsWith(prefix))
);
