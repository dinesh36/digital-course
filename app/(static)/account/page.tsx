import ProfileView from './ProfileView';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function AccountPage() {
  const seoData = await getSeoData('account');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <ProfileView />
    </>
  );
}
