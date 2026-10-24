import { getProducts } from '@/ecom/services/product/product.service';
import { Product } from '@/ecom/types/product';

const normalizeSku = (sku?: string) => sku?.trim().toLowerCase() || '';

// For the products that do not come from the product API (the wishlist is still Magento's): `isPurchased` of the products
// the API knows by these skus. The product API's own lists carry the flag already.
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
    const { items } = await getProducts({ skus: uniqueSkus, includePurchased: true, showErrorToast: false });
    const purchasedBySku = new Map(items.map((item) => [normalizeSku(item.sku), Boolean(item.isPurchased)]));

    return normalizedProducts.map((product) => ({
      ...product,
      isPurchased: purchasedBySku.get(normalizeSku(product.sku)) ?? false,
    }));
  } catch {
    return normalizedProducts;
  }
}
