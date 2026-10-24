import graphqlService from '@/ecom/services/graphql-service';
import {
  getProductDiscount,
} from '@/ecom/services/product/product-list/product-list.graphql';
import { Product } from '@/ecom/types/product';
import { getProducts, GetProductsOptions } from '@/ecom/services/product/product.service';

export type ProductDiscountRule = {
  name: string;
};

// Digital products carry `isPurchased` on every call (the lib's default is off: it is a lookup in the customer's orders)
export async function fetchProducts(options: GetProductsOptions): Promise<{ items: Product[]; total_count: number }> {
  return getProducts({ ...options, includePurchasedFlag: options.includePurchasedFlag ?? true });
}

export async function fetchProductDiscountRules(): Promise<string[]> {
  const response = await graphqlService<{ allCartRules: ProductDiscountRule[] }>({
    query: getProductDiscount,
    errorMessage: 'Failed to fetch discount rules',
  });

  return response.allCartRules.map((rule) => rule.name);
}
