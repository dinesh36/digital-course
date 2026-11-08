import { UnsubscribeForm } from '@/ecom/pages/unsubscribe/UnsubscribeForm';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function UnsubscribePage() {
  const seoData = await getSeoData('unsubscribe');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <UnsubscribeForm title={seoData.pageTitle} />
    </>
  );
}
