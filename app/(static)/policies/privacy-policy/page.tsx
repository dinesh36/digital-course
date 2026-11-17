import PrivacyPolicy from '@/ecom/pages/policies/PrivacyPolicy';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function PrivacyPolicyPage() {
  const seoData = await getSeoData('policies/privacy-policy');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <PrivacyPolicy title={seoData.pageTitle} />
    </>
  );
}
