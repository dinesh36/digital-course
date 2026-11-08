import CoursesList from '@/ecom/pages/product/ProductList/CoursesList';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

export default async function CoursesPage() {
  const seoData = await getSeoData('courses');

  return (
    <>
      <StaticPageSeo seoData={seoData} />
      <CoursesList />
    </>
  );
}
