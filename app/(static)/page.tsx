import HomeView from './HomeView';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function Home() {
  const seoData = await getSeoData('home');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <HomeView />
    </>
  );
}
