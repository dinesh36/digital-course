import { Product, ProductCartItem } from '@/ecom/types/product';
import {
  getProductDiscountPrice, getProductDisplayPrice, getProductRegularPrice,
} from '@/ecom/utils';
import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  product: Product | ProductCartItem;
  showDiscount?: boolean;
  showRegularPrice?: boolean;
  className?: string;
  isDetailPrice?: boolean;
}

export function ProductPrice({
  product, showDiscount = false, showRegularPrice = true, className = '', isDetailPrice = false,
}: ProductPriceProps) {
  const renderProductFinalPrice = () => (
    <span data-testid="product-price">
      {getProductDisplayPrice(product)}
    </span>
  );

  const renderProductActualPrice = () => (
    getProductRegularPrice(product) && showRegularPrice && (
    <span data-testid="product-regular-price">
      {getProductRegularPrice(product)}
    </span>
    )
  );

  const renderProductDiscount = () => (
    getProductDiscountPrice(product) && showDiscount && (
    <span data-testid="product-discount">
      {getProductDiscountPrice(product)}
    </span>
    )
  );

  let combinedClassName = `${styles.productPriceContainer} ${className} `;
  if (isDetailPrice) {
    combinedClassName = combinedClassName.concat(`flex items-center gap-2 ${styles.detailPrice}`);
  }

  return (
    <div data-testid="product-price-container" className={combinedClassName}>
      {renderProductFinalPrice()}
      {renderProductActualPrice()}
      {renderProductDiscount()}
    </div>
  );
}
