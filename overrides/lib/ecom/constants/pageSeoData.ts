import { BRAND_NAME } from './constant';

// The SEO details of a page that has no CMS record, or whose fetch failed. They belong to the store, so the lib has none.
export const DEFAULT_SEO_DATA = {
  pageTitle: BRAND_NAME,
  metaTitle: `${BRAND_NAME} – Learn Finance, Tech and Career Skills Online`,
  metaDescription: 'Learn at your own pace with practical online courses in finance, AI, programming, career and health.',
  metaKeywords: 'online courses, digital courses, finance courses, programming courses, learn online, downloadable courses',
  metaImage: '/assets/images/digitalcourseio-logo.png',
  metaImageHeight: 108,
  metaImageWidth: 574,
};
