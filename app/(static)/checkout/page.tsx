import CheckoutView from './CheckoutView';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function CheckoutPage() {
  const seoData = await getSeoData('checkout');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <CheckoutView />
    </>
  );
}
