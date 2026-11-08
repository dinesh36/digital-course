import RefundPolicy from '@/ecom/pages/policies/RefundPolicy';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function RefundPolicyPage() {
  const seoData = await getSeoData('policies/refund-policy');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <RefundPolicy title={seoData.pageTitle} />
    </>
  );
}
