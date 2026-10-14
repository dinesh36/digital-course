import graphqlService from '@/ecom/services/graphql-service';
import getProductDownloadLinkQuery from '@/ecom/services/product/product-list/product-download.graphql';
import { ProductDownloadQueryResponse } from '@/ecom/services/product/product-list/product-download.response.type';
import { ProductDownloadLinkItem } from '@/ecom/types/product';

export async function fetchProductDownloadLink(sku: string): Promise<ProductDownloadLinkItem | null> {
  if (!sku) {
    return null;
  }

  const { downloadProduct } = await graphqlService<ProductDownloadQueryResponse>({
    query: getProductDownloadLinkQuery,
    variables: { sku },
  });

  if (!downloadProduct?.downloadUrl) {
    return null;
  }

  return {
    sku,
    downloadUrl: downloadProduct.downloadUrl,
  };
}
