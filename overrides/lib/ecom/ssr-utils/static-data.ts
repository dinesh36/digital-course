import { getBlogPosts } from '@/ecom/services/blog/blog.service';
import { getProducts } from '@/ecom/services/product/product.service';

// The backend's biggest page
const PAGE_SIZE = 100;

// The url keys of every blog post, for `generateStaticParams`: a post that is not in the list at build time has no page.
export async function getAllBlogUrlKeys(): Promise<string[]> {
  const urlKeys: string[] = [];
  for (let page = 1, totalPages = 1; page <= totalPages; page += 1) {
    // The pages are read one after the other: each one tells how many there are
    // eslint-disable-next-line no-await-in-loop
    const { items, pageInfo } = await getBlogPosts({ page, pageSize: PAGE_SIZE });
    totalPages = pageInfo.totalPages;
    urlKeys.push(...items.map(({ urlKey }) => urlKey));
  }
  return urlKeys;
}

// The url keys of every product, for `generateStaticParams`
export async function getAllProductUrlKeys(): Promise<string[]> {
  const urlKeys: string[] = [];
  for (let page = 1, total = 1; urlKeys.length < total; page += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { items, total_count: totalCount } = await getProducts({
      currentPage: page, pageSize: PAGE_SIZE, showErrorToast: false,
    });
    if (items.length === 0) break;
    total = totalCount;
    urlKeys.push(...items.map(({ urlKey }) => urlKey));
  }
  return urlKeys;
}
