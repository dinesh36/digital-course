import { getRelatedProducts } from '@/ecom/services/product/product.service';

export const getRelatedProductsList = (sku: string) => getRelatedProducts(sku, false, true);
