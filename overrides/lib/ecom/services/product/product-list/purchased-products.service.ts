import graphqlService from '@/ecom/services/graphql-service';
import getPurchasedProductsQuery from '@/ecom/services/product/product-list/purchased-products.graphql';
import { Product, PurchasedProductItem } from '@/ecom/types/product';

type PurchasedProductsResponse = {
  purchasedProducts: PurchasedProductItem[];
};

const normalizeSku = (sku?: string) => sku?.trim().toLowerCase() || '';

export async function fetchPurchasedProducts(skus: string[]): Promise<PurchasedProductItem[]> {
  const { purchasedProducts } = await graphqlService<PurchasedProductsResponse>({
    query: getPurchasedProductsQuery,
    variables: { skus },
  });

  return purchasedProducts || [];
}

export async function attachPurchasedStatusToProducts(
  products: Product[],
  isUserLoggedIn = false,
): Promise<Product[]> {
  const normalizedProducts = products.map((product) => ({
    ...product,
    isPurchased: product.isPurchased ?? false,
  }));

  if (!isUserLoggedIn || normalizedProducts.length === 0) {
    return normalizedProducts;
  }

  const uniqueSkus = [...new Set(
    normalizedProducts
      .map((product) => product.sku?.trim())
      .filter((sku): sku is string => Boolean(sku)),
  )];

  if (uniqueSkus.length === 0) {
    return normalizedProducts;
  }

  try {
    const purchasedProducts = await fetchPurchasedProducts(uniqueSkus);

    const purchasedBySku = new Map(
      purchasedProducts.map((item) => [normalizeSku(item.sku), Boolean(item.purchased)]),
    );

    return normalizedProducts.map((product) => ({
      ...product,
      isPurchased: purchasedBySku.get(normalizeSku(product.sku)) ?? false,
    }));
  } catch {
    return normalizedProducts;
  }
}
