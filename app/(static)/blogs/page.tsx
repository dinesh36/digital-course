import BlogList from '@/ecom/pages/blogs/BlogList/BlogList';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function BlogsPage() {
  const seoData = await getSeoData('blogs');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <BlogList />
    </>
  );
}
