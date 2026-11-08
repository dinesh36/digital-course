import CreatePasswordForm from '@/ecom/pages/auth/CreatePasswordForm/CreatePasswordForm';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function CreatePasswordPage() {
  const seoData = await getSeoData('create-password');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <CreatePasswordForm />
    </>
  );
}
