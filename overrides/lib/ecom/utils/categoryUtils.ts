import { ProductCategory } from '@/ecom/types/productCategory';
import { FILTER_GROUP_CATEGORIES_QUERY_PARAM } from '@/ecom/constants';

// The courses have no /collections/<urlKey> page: a category is a filter on the course list (its courses, and those of
// its children).
export const getCategoryLink = (urlKey: string) => (
  `/courses?${FILTER_GROUP_CATEGORIES_QUERY_PARAM}=${encodeURIComponent(urlKey)}`
);

export const findCategoryChildrenByName = (
  categoryList: ProductCategory[],
  targetName: string,
): ProductCategory[] => categoryList.reduce<ProductCategory[]>((found, category) => {
  if (found.length) return found;
  if (category.name?.toLowerCase() === targetName.toLowerCase()) return category.children ?? [];
  return findCategoryChildrenByName(category.children ?? [], targetName);
}, []);
