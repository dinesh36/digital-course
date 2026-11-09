import { notFound } from 'next/navigation';
import CourseDetails from '@/ecom/pages/course/CourseDetails/CourseDetails';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getProducts } from '@/ecom/services/product/product.service';
import { getProductWithAttributes } from '@/ecom/utils';
import { generateProductSeoContent } from '@/ecom/store/layout/layout-thunk';
import { getAllProductUrlKeys } from '@/ecom/ssr-utils/static-data';
import { Breadcrumb } from '@/ecom/components/layout';
import { PRODUCTS_LABEL, PRODUCTS_PATH } from '@/ecom/constants';

// Only the products that exist at build time have a page
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllProductUrlKeys()).map((urlKey) => ({ 'courses-urlKey': urlKey }));
}

export default async function CoursePage({ params }: { params: Promise<{ 'courses-urlKey': string }> }) {
  const { 'courses-urlKey': rawUrlKey } = await params;
  // Without a customer, so without `isPurchased`: the browser loads the product again for a signed-in customer (`CourseDetails`)
  const { items } = await getProducts({ urlKey: decodeURIComponent(rawUrlKey), showErrorToast: false });
  if (!items[0]) notFound();
  const product = getProductWithAttributes(items[0], undefined);

  return (
    <>
      <StaticPageSeo seoData={generateProductSeoContent(product)} />
      {/* A product has no CMS page, so its breadcrumb is set here: the courses page, then the product */}
      <Breadcrumb items={[{ label: PRODUCTS_LABEL, link: `/${PRODUCTS_PATH}` }, { label: product.name }]} />
      <CourseDetails initialProduct={product} />
    </>
  );
}
