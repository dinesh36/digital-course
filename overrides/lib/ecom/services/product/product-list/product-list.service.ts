import { Product } from '@/ecom/types/product';
import { getProducts, GetProductsOptions } from '@/ecom/services/product/product.service';

// Digital products carry `isPurchased` on every call (the lib's default is off: it is a lookup in the customer's orders)
export async function fetchProducts(options: GetProductsOptions): Promise<{ items: Product[]; total_count: number }> {
  return getProducts({ ...options, includePurchasedFlag: options.includePurchasedFlag ?? true });
}
