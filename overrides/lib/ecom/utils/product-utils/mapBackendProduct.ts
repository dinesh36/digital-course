import type { Product } from '@/ecom/types/product';
import { mapBackendProduct as originalMapBackendProduct } from '@/ecom-base/utils/product-utils/mapBackendProduct';

// The total size of the files the customer gets (each size is in bytes).
const formatTotalFileSizeToMB = (files: Product['productFiles'] = []): string => {
  const bytes = files.reduce((total, file) => total + (file.size || 0), 0);
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export function mapBackendProduct(item: Product): Product {
  const field = (name: string) => item.productCustomFields?.[name]?.value;
  const text = (name: string) => {
    const value = field(name);
    return value === undefined || value === null ? undefined : String(value);
  };

  return {
    ...originalMapBackendProduct(item),
    isPurchased: item.isPurchased ?? false,
    documentAuthorName: text('author'),
    documentPageCount: text('pageCount'),
    documentFileSize: formatTotalFileSizeToMB(item.productFiles),
    documentFormat: text('format'),
    documentHours: text('hours'),
    documentStructure: text('documentStructure'),
  };
}

export const mapBackendProductList = (items: Product[]): Product[] => items.map(mapBackendProduct);
