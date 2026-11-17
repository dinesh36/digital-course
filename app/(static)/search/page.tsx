import SearchResultsList from '@/ecom/pages/product/SearchResults/SearchResultsList';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function SearchPage() {
  const seoData = await getSeoData('search');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <SearchResultsList />
    </>
  );
}
