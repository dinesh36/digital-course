import { getRelatedProducts } from '@/ecom/services/product/product.service';

export const getRelatedProductsList = (sku: string, isUserLoggedIn = false) => getRelatedProducts(sku, false, isUserLoggedIn);
