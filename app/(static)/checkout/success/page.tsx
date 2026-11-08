import CheckoutSuccessView from './CheckoutSuccessView';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function CheckoutSuccessPage() {
  const seoData = await getSeoData('checkout/success');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <CheckoutSuccessView />
    </>
  );
}
