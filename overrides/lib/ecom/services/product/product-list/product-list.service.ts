import apiService from '@/ecom/services/api-service';
import graphqlService from '@/ecom/services/graphql-service';
import {
  getProductDiscount,
  getSiteMapProductsGqlQuery,
  ProductGqlQueryOptions,
} from '@/ecom/services/product/product-list/product-list.graphql';
import { Product, SortBy } from '@/ecom/types/product';
import { mapProductListResponse } from '@/ecom/utils';
import { ResponseProduct } from '@/ecom/services/product/product.response.type';
import { attachPurchasedStatusToProducts } from '@/ecom/services/product/product-list/purchased-products.service';
import { CacheOptions } from '@/ecom/services/api-cache';

export type GetPaginatedProductsResponse = {
  products: {
    items: ResponseProduct[];
    page_info: {
      current_page: number;
      page_size: number;
      total_pages: number;
    };
    total_count: number;
  };
};

export type ProductDiscountRule = {
  name: string;
};

type FetchProductOptions = {
  search?: ProductGqlQueryOptions['search'],
  pageSize?: ProductGqlQueryOptions['pageSize'],
  currentPage?: ProductGqlQueryOptions['currentPage'],
  categoryUrlKey?: string;
  categoryUids?: string[];
  categoryUidGroups?: string[][];
  urlKey?: string;
  skus?: string[];
  showErrorToast?: boolean;
  sku?: string;
  sortBy?: SortBy;
  cache?: CacheOptions;
  isUserLoggedIn?: boolean;
};

export async function fetchProducts({
  search,
  pageSize,
  currentPage,
  urlKey,
  categoryUrlKey,
  categoryUids = [],
  skus,
  showErrorToast = true,
  sku,
  sortBy,
  categoryUidGroups = [],
  cache = false,
  isUserLoggedIn = false,
}: FetchProductOptions): Promise<{ items: Product[]; total_count: number, sku?: string }> {
  const params = new URLSearchParams();

  if (search) params.set('search', search);
  if (pageSize !== undefined) params.set('pageSize', pageSize.toString());
  if (currentPage !== undefined) params.set('currentPage', currentPage.toString());
  if (sku) params.set('sku', sku);
  if (urlKey) params.set('url_key', urlKey);
  if (categoryUrlKey) params.set('category_url_key', categoryUrlKey);
  if (sortBy) params.set('sortBy', sortBy);
  if (categoryUids.length > 0) {
    params.set('category_uid', categoryUids.join(','));
  }
  if (skus && skus.length > 0) {
    params.set('skus', skus.join(','));
  }
  if (categoryUidGroups.length > 0) {
    params.set('categoryUidGroups', JSON.stringify(categoryUidGroups));
  }

  const { products } = await apiService({
    url: `/api/products?${params.toString()}`,
    method: 'GET',
    cache,
    errorMessage: showErrorToast ? 'Error in fetching product' : undefined,
  });

  const mappedProducts = mapProductListResponse(products.items);
  const items = await attachPurchasedStatusToProducts(mappedProducts, isUserLoggedIn);
  return {
    items,
    total_count: products.total_count,
  };
}

export async function fetchProductDiscountRules(): Promise<string[]> {
  const response = await graphqlService<{ allCartRules: ProductDiscountRule[] }>({
    query: getProductDiscount,
    errorMessage: 'Failed to fetch discount rules',
  });

  return response.allCartRules.map((rule) => rule.name);
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  const pageSize = 1000;
  let products: Array<ResponseProduct> = [];
  const getSinglePage = async (page = 1) => {
    const response = await graphqlService<GetPaginatedProductsResponse>({
      query: getSiteMapProductsGqlQuery,
      variables: { pageSize, currentPage: page },
      cache: { timeout: 1000 * 60 * 60 * 24 }, // 24 hours
    });
    return response;
  };

  const { products: { items: firstPageProducts, total_count: totalCount } } = await getSinglePage();
  products = [...firstPageProducts];

  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  for (let page = 2; page <= totalPages; page += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { products: { items } } = await getSinglePage(page);
    products = [...products, ...items];
  }

  return mapProductListResponse(products);
};
