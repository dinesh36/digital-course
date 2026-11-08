import AboutUsPage from '@/ecom/pages/about-us/AboutUsPage';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function AboutUs() {
  const seoData = await getSeoData('about-us');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <AboutUsPage />
    </>
  );
}
