'use client';

import React from 'react';
import Link from 'next/link';
import styles from './CartItem.module.scss';
import { useIsMobile } from '@/ecom/utils/hook/useResponsive';
import { ProductCartItem } from '@/ecom/types/product';
import { Button, Image } from '@/ui/components';
import { removeCartItemThunk } from '@/ecom/store/cart/cart-thunk';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { ProductPrice } from '@/ecom/components/product';
import { TrashIcon } from '@/ui/icons';
import OutOfStockBadge from '@/ecom/components/product/OutOfStockBadge/OutOfStockBadge';
import { findCategoryChildrenByName } from '@/ecom/utils/categoryUtils';
import { getProductPath } from '@/ecom/utils/pathUtils';

interface Props { item: ProductCartItem; forceMobileView?: boolean }

export function CartItem({ item, forceMobileView }: Props) {
  const dispatch = useAppDispatch();
  const isMobile = forceMobileView || useIsMobile();
  const isCompactView = isMobile || forceMobileView;
  const href = getProductPath(item.urlKey);
  const categories = item.categories || [];
  const allCategories = useAppSelector((state) => state.layout.categories);

  const coursesGroupChildren = React.useMemo(
    () => findCategoryChildrenByName(allCategories.data, 'Courses Group') ?? [],
    [allCategories.data],
  );

  const categoryBadgeText = React.useMemo(() => {
    if (!categories?.length) return '';

    const idSet = new Set(coursesGroupChildren.map((c) => c.id));
    const nameSet = new Set(coursesGroupChildren.map((c) => c.name?.toLowerCase()));

    const result = categories
      .filter(
        (c: { id: string; name: string; }) => c
                    && ((c.id && idSet.has(c.id)) || nameSet.has(c.name?.toLowerCase())),
      )
      .map((c) => c.name);

    return (result.length ? result : categories.map((c) => c.name)).join(', ');
  }, [categories, coursesGroupChildren]);

  const renderImage = () => (
    <div className={styles.imageWrapper}>
      <Link href={href}>
        <Image src={item.image.url} alt={item.image.alt} />
      </Link>
    </div>
  );

  const renderRemoveButton = (showLabel = false) => (
    <Button
      type="button"
      variant="clear"
      className={styles.removeBtn}
      onClick={() => dispatch(removeCartItemThunk(item.cartItemId))}
    >
      <TrashIcon />
      {showLabel && <span>REMOVE</span>}
    </Button>
  );

  const renderNameAndConfigOptions = () => (
    <div className={styles.details}>
      <p className={styles.category}>{categoryBadgeText}</p>
      <div className={styles.nameRow}>
        <Link href={href}>{item.name}</Link>
        {!item.isInStock && <OutOfStockBadge className={styles.outOfStock} />}
      </div>
    </div>
  );

  const renderCompactNameAndTrash = () => (
    <div className={styles.titleRow}>
      {renderNameAndConfigOptions()}
      {renderRemoveButton(false)}
    </div>
  );

  const renderDesktopView = () => (
    <div className={styles.cartItem}>
      {renderImage()}
      <div className={styles.productDetails}>
        <div className={styles.textAndTotalPrice}>
          {renderNameAndConfigOptions()}
          <ProductPrice product={item} className={styles.priceBlock} />
        </div>
        <div className={styles.quantityAndRemoveButton}>
          {renderRemoveButton(false)}
        </div>
      </div>
    </div>
  );

  const renderCompactView = () => (
    <div className={styles.cartItemCompact}>
      {renderImage()}
      <div className="w-[100%]">
        <div className={styles.titlePriceRow}>
          {renderCompactNameAndTrash()}
          <ProductPrice product={item} className={styles.priceBlock} showRegularPrice={false} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.cartItemContainer}>
      {isCompactView ? renderCompactView() : renderDesktopView()}
    </div>
  );
}
