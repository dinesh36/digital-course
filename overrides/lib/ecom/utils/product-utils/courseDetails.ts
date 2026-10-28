import type { Product } from '@/ecom/types/product';

const BYTES_IN_MB = 1024 * 1024;

// A file size in bytes, in KB under 1 MB and in MB above.
export const formatFileSize = (bytes: number): string => (
  bytes < BYTES_IN_MB ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / BYTES_IN_MB).toFixed(2)} MB`
);

// The size of the files the customer gets (each size is in bytes), in MB.
const formatTotalFileSizeToMB = (files: Product['productFiles'] = []): string => {
  const bytes = files.reduce((total, file) => total + (file.size || 0), 0);
  return `${(bytes / BYTES_IN_MB).toFixed(2)} MB`;
};

// What a course shows about its document, from the product's custom fields and files.
export function getCourseDetails(product: Product) {
  const text = (name: string): string | undefined => {
    const value = product.productCustomFields?.[name]?.value;
    return value === undefined || value === null ? undefined : String(value);
  };

  return {
    author: text('author'),
    pageCount: text('pageCount'),
    format: text('format'),
    hours: text('hours'),
    structure: text('documentStructure'),
    fileSize: formatTotalFileSizeToMB(product.productFiles),
    // What the product contains: each file's name and size
    files: (product.productFiles ?? []).map((file) => ({ name: file.name, size: formatFileSize(file.size) })),
  };
}
