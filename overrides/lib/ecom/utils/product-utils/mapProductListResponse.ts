import type { Attribute, Product } from '@/ecom/types/product';
import { ResponseProduct } from '@/ecom/services/product/product.response.type';
import { mapProductFields as originalMapProductFields } from '@/ecom-base/utils/product-utils/mapProductListResponse';

const formatFileSizeToMB = (sizeInKB?: number | string): string => {
  if (!sizeInKB) return '0 MB';

  const kb = typeof sizeInKB === 'string' ? parseFloat(sizeInKB) : sizeInKB;
  if (Number.isNaN(kb)) return '0 MB';
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
};

export function mapProductFields(item: ResponseProduct): Product {
  return {
    ...originalMapProductFields(item as ResponseProduct),
    documentAuthorName: item.custom_attributesV2?.items.find(
      ({ code }) => code === 'document_author',
    )?.value,
    documentPageCount: item.custom_attributesV2?.items.find(
      ({ code }) => code === 'document_page_count',
    )?.value,
    documentFileSize: formatFileSizeToMB(
      item.custom_attributesV2?.items.find(
        ({ code }) => code === 'document_size',
      )?.value,
    ),
    documentFormat: item.custom_attributesV2?.items.find(
      ({ code }) => code === 'document_format',
    )?.value,
    documentHours: item.custom_attributesV2?.items.find(
      ({ code }) => code === 'document_hours',
    )?.value,
    documentStructure: item.custom_attributesV2?.items.find(
      ({ code }) => code === 'document_structure',
    )?.value,
  };
}

export function mapProductItemResponse(item: ResponseProduct): Product {
  const product: Product = mapProductFields(item);
  const variants: Product[] = (item.variants || []).map((variant) => {
    const convertedVariantProduct = mapProductFields(variant.product);
    const attributes: Attribute[] = (variant.attributes || []).map((attribute) => ({
      attributeId: attribute.code,
      attributeLabel:
          (product.configurableOptions || []).find(
            ({ attributeCode }) => attributeCode === attribute.code,
          )?.label || '',
      selectedAttributeId: attribute.uid,
      selectedAttributeLabel: attribute.label,
    }));
    return {
      ...convertedVariantProduct,
      attributes,
    };
  });

  let selectedVariant;

  if (variants.length) {
    const sortedVariants = [...variants].sort(
      (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
    );
    selectedVariant = sortedVariants.find((v) => v.isInStock);
    if (!selectedVariant) {
      const [firstVariant] = sortedVariants;
      selectedVariant = firstVariant;
    }
  }

  return {
    ...product,
    variants,
    selectedVariant,
  } as Product;
}

export function mapProductListResponse(products: ResponseProduct[]): Product[] {
  return products.map((item) => mapProductItemResponse(item));
}
