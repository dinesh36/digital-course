import { Product as BaseProduct, Attribute } from '@/ecom-base/types/product/product';

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

export type PurchasedProductItem = {
    sku: string;
    purchased: boolean;
};

export type ProductDownloadLinkItem = {
    sku: string;
    downloadUrl?: string;
    linkTitle?: string;
};

export type ProductList = Product[];

export type ProductCartItem = Product & {
    quantity: number;
    rowTotal: number;
    rowTotalRegular: number;
    cartItemId: string;
    attributes?: Omit<Attribute, 'selectedAttributeId' | 'attributeId'>[];
    isItemAvailable: boolean;
};
