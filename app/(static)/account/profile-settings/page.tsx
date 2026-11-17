import ProfileSettings from '@/ecom/pages/ProfileSettings/ProfileSettings';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function ProfileSettingsPage() {
  const seoData = await getSeoData('account/profile-settings');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <ProfileSettings />
    </>
  );
}
