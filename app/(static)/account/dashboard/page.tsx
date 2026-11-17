import Dashboard from '@/ecom/pages/dashboard/Dashboard';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function AccountDashboardPage() {
  const seoData = await getSeoData('account/dashboard');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <Dashboard />
    </>
  );
}
