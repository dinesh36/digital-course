import graphqlService from '@/ecom/services/graphql-service';
import { PRODUCTS_PER_PAGE } from '@/ecom/constants';
import { mapProductItemResponse } from '@/ecom/utils';
import { attachPurchasedStatusToProducts } from '@/ecom/services/product/product-list/purchased-products.service';
import { getWishlistWithProductDetailsQuery } from '@/ecom-base/services/account/wishList/wishlist.graphql';

export * from '@/ecom-base/services/account/wishList/wishlist.service';

export const getCustomerWishlistWithProductDetails = async (currentPage: number) => {
  const response = await graphqlService({
    query: getWishlistWithProductDetailsQuery,
    variables: { currentPage, pageSize: PRODUCTS_PER_PAGE },
    errorMessage: 'Failed to fetch wishlist.',
  });

  const responseItems = response?.customer?.wishlists[0].items_v2?.items || [];
  const mappedProducts = responseItems.map((item: any) => mapProductItemResponse(item.product));
  const items = await attachPurchasedStatusToProducts(mappedProducts, true);

  return {
    items,
    currentPage: response?.customer?.wishlists[0].items_v2?.page_info?.current_page || 1,
    totalPages: response?.customer?.wishlists[0].items_v2?.page_info?.total_pages || 1,
  };
};
