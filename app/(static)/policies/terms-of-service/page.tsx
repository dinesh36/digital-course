import TermsOfService from '@/ecom/pages/policies/TermsOfService';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function TermsOfServicePage() {
  const seoData = await getSeoData('policies/terms-of-service');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <TermsOfService title={seoData.pageTitle} />
    </>
  );
}
