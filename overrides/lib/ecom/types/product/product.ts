import { Product as BaseProduct } from '@/ecom-base/types/product/product';

export type {
  ProductImage,
  ConfigurableOptionValue,
  ConfigurableOption,
  Attribute,
  ProductCategoryFilterItem,
  SortBy,
} from '@/ecom-base/types/product/product';

export type Product = BaseProduct & {
    isPurchased?: boolean;
    documentAuthorName?: string;
    documentPageCount?: string;
    documentFileSize?: string;
    documentFormat?: string;
    documentHours?: string;
    documentStructure?: string;
};
