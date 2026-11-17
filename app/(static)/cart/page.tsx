import { CartPage as CartPageCmp } from '@/ecom/pages/carts/CartPage/CartPage';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function CartPage() {
  const seoData = await getSeoData('cart');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <CartPageCmp />
    </>
  );
}
