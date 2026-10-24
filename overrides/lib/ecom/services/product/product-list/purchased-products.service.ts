import { getProducts } from '@/ecom/services/product/product.service';
import { Product, PurchasedProductItem } from '@/ecom/types/product';

const normalizeSku = (sku?: string) => sku?.trim().toLowerCase() || '';

// Which of these skus the signed-in customer bought, from the product API. For the products that do not come from it
// (the wishlist and the cart are still Magento's) and the checkout check; the product API's own lists carry `isPurchased`.
export async function fetchPurchasedProducts(skus: string[]): Promise<PurchasedProductItem[]> {
  if (skus.length === 0) return [];
  const { items } = await getProducts({ skus, includePurchased: true, showErrorToast: false });
  return items.map((item) => ({ sku: item.sku, purchased: Boolean(item.isPurchased) }));
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
    const purchasedBySku = new Map(
      (await fetchPurchasedProducts(uniqueSkus)).map((item) => [normalizeSku(item.sku), item.purchased]),
    );

    return normalizedProducts.map((product) => ({
      ...product,
      isPurchased: purchasedBySku.get(normalizeSku(product.sku)) ?? false,
    }));
  } catch {
    return normalizedProducts;
  }
}
