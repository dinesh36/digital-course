import { ContactUsForm } from '@/ecom/pages/contact/ContactUsForm';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function ContactUsPage() {
  const seoData = await getSeoData('contact-us');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <ContactUsForm title={seoData.pageTitle} />
    </>
  );
}
