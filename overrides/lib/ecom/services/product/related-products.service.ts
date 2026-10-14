import graphqlService from '@/ecom/services/graphql-service';
import getRelatedProductsListQuery from '@/ecom/services/product/related-products/related-products.graphql';
import { mapProductItemResponse } from '@/ecom/utils';
import { ResponseProduct } from '@/ecom/services/product/product.response.type';
import { attachPurchasedStatusToProducts } from '@/ecom/services/product/product-list/purchased-products.service';

interface RelatedProductsResponse {
    products: {
        items: (ResponseProduct & {
            related_products?: ResponseProduct[];
            upsell_products?: ResponseProduct[];
            crosssell_products?: ResponseProduct[];
        })[];
    };
}

export const getRelatedProductsList = async (sku: string, isUserLoggedIn = false) => {
  const response = await graphqlService<RelatedProductsResponse>({
    variables: { sku },
    query: getRelatedProductsListQuery,
  });

  const productItem = response?.products?.items?.[0];
  if (!productItem) return null;

  const product = mapProductItemResponse(productItem);
  const related = await attachPurchasedStatusToProducts(
    (productItem.related_products || []).map(mapProductItemResponse),
    isUserLoggedIn,
  );
  const upsell = await attachPurchasedStatusToProducts(
    (productItem.upsell_products || []).map(mapProductItemResponse),
    isUserLoggedIn,
  );
  const crosssell = await attachPurchasedStatusToProducts(
    (productItem.crosssell_products || []).map(mapProductItemResponse),
    isUserLoggedIn,
  );

  return {
    product: (await attachPurchasedStatusToProducts([product], isUserLoggedIn))[0],
    related,
    upsell,
    crosssell,
  };
};
