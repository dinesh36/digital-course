import {
  configurableOptionsFields, variantsFields, minimalProductFields, priceFields, imageFields, customAttributesFields,
} from '@/ecom-base/services/product/product-list/product-list.graphql';
import { pagingFields } from '@/ecom/constants';

export {
  configurableOptionsFields, variantsFields,
  getProductDiscount, getSiteMapProductsGqlQuery, priceFields,
  imageFields, minimalProductFields,
} from '@/ecom-base/services/product/product-list/product-list.graphql';

export const productFields = `
  ${minimalProductFields}
  ${priceFields}
  media_gallery ${imageFields}
  short_description {
    html
  }
  rating_summary
  review_count
  categories {
    uid
    name
  }
`;

export const productItemFields = `
    ${productFields}
    ${customAttributesFields}
    ... on ConfigurableProduct {
      ${configurableOptionsFields}
      ${variantsFields}
    }
`;

export const productDetailFields = `
    ${productItemFields}
    ${customAttributesFields}
    description {
        html
    }
    meta_title
    meta_description
    meta_keyword
`;

export type ProductGqlQueryOptions = {
    search?: string,
    pageSize?: number,
    currentPage?: number,
    filter?: Record<string, any>;
    isInstagramQuery?: boolean;
    groupedFilter?: Array<Record<string, any>>;
    sort?: Record<string, 'ASC' | 'DESC'>;
};

export const getFormattedProductGqlQuery = ({
  search,
  pageSize,
  currentPage,
  filter,
  groupedFilter,
  isInstagramQuery = false,
  sort,
}: ProductGqlQueryOptions) => {
  const isGroupedFilter = groupedFilter !== undefined;
  const isFilter = filter !== undefined && !isGroupedFilter;
  const queryVariables = `
        ${search !== undefined ? '$search: String' : ''}
        ${pageSize !== undefined ? '$pageSize: Int!' : ''}
        ${currentPage !== undefined ? '$currentPage: Int!' : ''}
        ${isFilter ? '$filter: ProductAttributeFilterInput' : ''}
        ${isGroupedFilter ? '$groupedFilter: [ProductAttributeFilterInput!]' : ''}
        ${sort !== undefined ? '$sort: ProductAttributeSortInput' : ''}
  `.trim();

  const isProductDetailsQuery = filter?.url_key?.eq !== undefined;
  return `
    query GetPaginatedProducts(${queryVariables}) {
      products(
        ${search !== undefined ? 'search: $search' : ''}
        ${pageSize !== undefined ? 'pageSize: $pageSize' : ''}
        ${currentPage !== undefined ? 'currentPage: $currentPage' : ''}
        ${isFilter ? 'filter: $filter' : ''}
        ${isGroupedFilter ? 'groupedFilter: $groupedFilter' : ''}
        ${sort !== undefined ? 'sort: $sort' : ''}
      ) {
        items {
          ${isProductDetailsQuery ? productDetailFields : productItemFields}
          ${isInstagramQuery ? customAttributesFields : ''}
        }
        page_info {
          ${pagingFields}
        }
        total_count
      }
    }
  `;
};
