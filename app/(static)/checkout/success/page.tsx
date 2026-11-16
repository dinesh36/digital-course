import CheckoutSuccessView from './CheckoutSuccessView';
import FullScreenMarker from '@/ecom/components/layout/FullScreenMarker';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function CheckoutSuccessPage() {
  const seoData = await getSeoData('checkout/success');

  return (
    <>
      <FullScreenMarker />
      <StaticPageSeo seoData={seoData} />
      <CheckoutSuccessView />
    </>
  );
}
