'use client';

import React from 'react';
import { PageSeo } from '@/ecom/components/PageSeo/PageSeo';
import { PageSeoParams } from '@/ecom/types/pageSeoParams';

// The SEO tags of a page built at `next build`. The page reads its SEO data at build time (`getSeoData`, from the CMS page)
// and passes it here, so the tags are in the HTML. (An async `generateMetadata` is streamed after the HTML by Next 15.3, so
// it is not in the first bytes a crawler reads.) `PageSeo` reads the path with a hook, so it is rendered through a client
// component; it is still rendered to HTML at build.
export default function StaticPageSeo({ seoData }: { seoData: PageSeoParams }) {
  return <PageSeo seoData={seoData} />;
}
