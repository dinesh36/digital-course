import { BreadcrumbItem } from '@/ecom/types/layout';

export * from '@/ecom-base/constants/constant';

export const PRODUCTS_PATH = 'courses';
export const PRODUCTS_LABEL = 'Courses';
export const CHECKOUT_AUTH_WARNING_MESSAGE = 'Please log in before proceeding to checkout.';

export const breadCrumbItems: Record<string, BreadcrumbItem[]> = {
  '/contact-us': [{ label: 'Contact Us' }],
  '/about-us': [{ label: 'About Us' }],
  '/blogs': [{ label: 'Blogs' }],
  '/cart': [{ label: 'Cart' }],
  '/checkout': [{ label: 'Checkout' }],
  '/checkout/payment': [{ label: 'Checkout' }, { label: 'Payment' }],
  '/create-password': [{ label: 'Create Password' }],
  '/unsubscribe': [{ label: 'Unsubscribe' }],
  '/image-editor': [{ label: 'Image Editor' }],
  '/image-editor/create-project': [{ label: 'Create Project' }],
  '/image-editor/profile': [{ label: 'Profile' }],
  '/image-editor/projects': [{ label: 'Projects' }],
  '/image-editor/setting': [{ label: 'Setting' }],
  '/image-editor/templates': [{ label: 'Templates' }],
  '/search': [{ label: 'Search Results' }],
  '/wishlist': [{ label: 'Wishlist' }],
  '/policies/privacy-policy': [{ label: 'Privacy Policy' }],
  '/policies/refund-policy': [{ label: 'Refund Policy' }],
  '/policies/terms-of-service': [{ label: 'Terms of service' }],
  '/account': [{ label: 'My Account' }],
  '/account/addresses': [{ label: 'My Account', link: '/account' }, { label: 'Addresses' }],
  '/account/change-password': [{ label: 'My Account', link: '/account' }, { label: ' Change Password' }],
  '/account/orders': [{ label: 'My Account', link: '/account' }, { label: ' Orders' }],
  [`/${PRODUCTS_PATH}`]: [{ label: PRODUCTS_LABEL }],
  '/not-found': [{ label: 'Not Found' }],
  '/account/dashboard': [{ label: 'Dashboard' }],
};
