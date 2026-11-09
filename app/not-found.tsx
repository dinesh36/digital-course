import React from 'react';
import NotFoundPage from '@/ecom/pages/layout/NotFound/NotFoundPage';
import StaticLayoutContainer from '@/ecom/pages/layout/StaticLayoutContainer';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getSeoData } from '@/ecom/ssr-utils/seo-metadata';

// The root layout is only the document shell, so the page chrome comes from the static layout (the 404 does not depend on the
// request). Its title, description and breadcrumb come from the CMS page `not-found`, read at build time like any other page.
export default async function NotFound() {
  const seoData = await getSeoData('not-found');

  return (
    <StaticLayoutContainer>
      <StaticPageSeo seoData={seoData} />
      <NotFoundPage />
    </StaticLayoutContainer>
  );
}
