'use client';

import React from 'react';
import { Download, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Link } from '@/ecom/components/layout';
import styles from './ProductTile.module.scss';
import { Product } from '@/ecom/types/product';
import ProductImage from '@/ecom/components/ProductImage/ProductImage';
import { ProductPrice, WishlistProductButton } from '@/ecom/components/product';
import { AddToCartButton } from '@/ecom/components/product/AddToCartButton/AddToCartButton';
import { Button, Typography } from '@/ui/components';
import { getDisplayPrice } from '@/ecom/utils';
import { useProductDownload } from '@/ecom/components/product/useProductDownload';
import { findCategoryChildrenByName, getCategoryLink } from '@/ecom/utils/categoryUtils';
import { useAppSelector } from '@/ecom/store/hooks';
import { getProductPath } from '@/ecom/utils/pathUtils';

type ProductTileProps = {
    product: Product;
    isSearchTile?: boolean;
    isDashboardTile?: boolean;
    onClick?: () => void;
};

export default function ProductTile({
  product,
  isSearchTile,
  isDashboardTile,
  onClick,
}: ProductTileProps) {
  const {
    name, thumbnailImage, categories: productCategories, documentAuthorName,
  } = product;
  const allCategories = useAppSelector((state) => state.layout.categories);
  const { isDownloading, downloadProduct } = useProductDownload(product);

  const getOrderAmount = (amount: number, currency?: string) => (
    currency ? getDisplayPrice(amount, currency) : getDisplayPrice(amount)
  );
  const coursesGroupChildren = React.useMemo(
    () => findCategoryChildrenByName(allCategories.data, 'Courses Group') ?? [],
    [allCategories.data],
  );

  const router = useRouter();
  const badgeCategory = React.useMemo(() => {
    const courseCategories = findCategoryChildrenByName(allCategories.data, 'Courses Group') ?? [];
    return courseCategories.find((cat) => productCategories?.find((pc) => pc.id === cat.id));
  }, [productCategories, coursesGroupChildren]);
  const categoryBadgeText = badgeCategory?.name || '';

  // The tile is itself a link, so the badge is not an anchor: it opens the category's course list instead of the course
  const openBadgeCategory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (badgeCategory) router.push(getCategoryLink(badgeCategory.urlKey));
  };

  const renderMedia = () => (
    <div className={styles.media}>
      <div className={styles.mediaInner}>
        <ProductImage src={thumbnailImage?.url} alt={thumbnailImage?.alt || name} className={styles.image} />
      </div>
      {badgeCategory && (
        <span
          role="link"
          tabIndex={0}
          className={styles.categoryBadge}
          onClick={openBadgeCategory}
          onKeyDown={(e) => e.key === 'Enter' && openBadgeCategory(e)}
        >
          {categoryBadgeText}
        </span>
      )}
    </div>
  );

  const renderRating = () => {
    if (product.totalReviews) {
      return (
        <div className={styles.ratingRow}>
          <Star className={styles.star} />
          <span className={styles.ratingValue}>{product.ratingSummary}</span>
          <span className={styles.students}>{`(${product.totalReviews} Reviews)`}</span>
        </div>
      );
    }
    return (
      <div className={styles.ratingRow}>
        <Star className={styles.blankStar} />
        <span className={styles.students}>( No Reviews )</span>
      </div>
    );
  };

  const renderHeader = () => (
    <>
      <Typography variant="h3" component="h3" className={styles.title}>{name}</Typography>
      <p className={styles.instructor}>{`by ${documentAuthorName}`}</p>
    </>
  );

  const renderFooter = () => (
    <div className={styles.footer}>
      <div className={styles.priceArea}>
        <span className={styles.priceLabel}>Price</span>
        <ProductPrice product={product} className={styles.price} />
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      >
        <AddToCartButton
          product={product}
          quantity={1}
          className={styles.enrollButton}
          label="Enroll"
          addedLabel="In Cart"
          showCartIcon={false}
        />
      </div>
    </div>
  );

  const renderFooterActions = () => (
    <div className={styles.actions}>
      <Button className={styles.button} onClick={downloadProduct} disabled={isDownloading}>
        <Download width={18} />
        PDF
      </Button>
      <Button variant="outlined" className={styles.button}>
        <Star width={18} />
        Rate
      </Button>
    </div>
  );

  const renderDashboardFooter = () => (
    <div className={styles.orderFooter}>
      <div className={styles.priceMeta}>
        {getOrderAmount(product.price, product.currency)}
      </div>
      {renderFooterActions()}
    </div>
  );

  return (
    <div className={styles.productTile} data-testid={`card-product-${product?.urlKey ?? (product as any)?.id}`}>
      <div className={styles.cardWrapper}>
        {!isSearchTile && (
        <WishlistProductButton
          product={product}
          className={`${styles.favoriteIconButton} ${styles.wishlistButton}`}
        />
        )}
        <Link href={getProductPath(product.urlKey)} onClick={onClick} className={styles.cardLink}>
          <div className={styles.card}>
            {renderMedia()}
            <div className={styles.content}>
              {renderRating()}
              {renderHeader()}
              {isDashboardTile ? renderDashboardFooter() : renderFooter()}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
