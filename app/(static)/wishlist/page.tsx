import { WishlistPage as WishlistPageCmp } from '@/ecom/pages/wishlist/WishlistPage';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function WishlistPage() {
  const seoData = await getSeoData('wishlist');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <WishlistPageCmp />
    </>
  );
}
