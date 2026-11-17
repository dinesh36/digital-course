import BlogDetail from '@/ecom/pages/blogs/BlogDetail/BlogDetail';
import FullScreenMarker from '@/ecom/components/layout/FullScreenMarker';
import StaticPageSeo from '@/ecom/components/PageSeo/StaticPageSeo';
import { getBlogPost } from '@/ecom/services/blog/blog.service';
import { getBlogSeoContent } from '@/ecom/store/layout/layout-thunk';
import { getAllBlogUrlKeys } from '@/ecom/ssr-utils/static-data';
import { Breadcrumb } from '@/ecom/components/layout';

// Only the posts that exist at build time have a page
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllBlogUrlKeys()).map((urlKey) => ({ 'blog-urlKey': urlKey }));
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ 'blog-urlKey': string }> }) {
  const { 'blog-urlKey': rawUrlKey } = await params;
  // The build is not a visitor: the view is counted by the browser (`BlogDetail`)
  const post = await getBlogPost(decodeURIComponent(rawUrlKey), { countView: false });

  return (
    <>
      <FullScreenMarker />
      <StaticPageSeo seoData={getBlogSeoContent(post)} />
      {/* A post has no CMS page, so its breadcrumb is set here: the blogs page, then the post */}
      <Breadcrumb items={[{ label: 'Blogs', link: '/blogs' }, { label: post.name }]} />
      <BlogDetail initialPost={post} />
    </>
  );
}
