import HomeView from './HomeView';
import FullScreenMarker from '@/ecom/components/layout/FullScreenMarker';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function Home() {
  const seoData = await getSeoData('home');

  return (
    <>
      <FullScreenMarker />
      <StaticPageSeo seoData={seoData} />
      <HomeView />
    </>
  );
}
