import React, { useEffect, useState } from 'react';
import styles from './CategoryProducts.module.scss';
import { Product, ProductList } from '@/ecom/types/product';
import { Button, Typography, ErrorMessage } from '@/ui/components';
import { fetchProducts } from '@/ecom/services/product';
import ProductTile from '@/ecom/components/product/ProductTile/ProductTile';
import ProductTileSkeleton from '@/ecom/components/product/ProductTile/ProductTileSkeleton/ProductTileSkeleton';
import { HorizontalScrollContainer } from '@/ui/layout';
import { CacheOptions } from '@/ecom/services/api-cache';
import { useAppSelector } from '@/ecom/store/hooks';
import { getCategoryLink } from '@/ecom/utils/categoryUtils';

const MAX_CATEGORY_PRODUCTS = 8;

type ProductListSectionProps = {
  categoryUrlKey?: string;
  products?: Product[];
  title?: string;
  layout?: 'horizontal' | 'grid' | 'responsive';
  className?: string;
  cache?: CacheOptions;
};

export default function CategoryProducts({
  categoryUrlKey,
  layout = 'horizontal',
  products: initialProducts,
  title,
  className,
  cache = false,
}: ProductListSectionProps) {
  const [products, setProducts] = useState<ProductList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const hideViewAllButton = initialProducts;
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  const fetchCategoryProducts = async () => {
    if (!categoryUrlKey) return;
    try {
      setIsError(false);
      setIsLoading(true);
      const { items } = await fetchProducts({
        categoryUrlKey,
        pageSize: MAX_CATEGORY_PRODUCTS,
        showErrorToast: false,
        cache,
      });
      setProducts(items);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((!initialProducts || initialProducts.length === 0) && categoryUrlKey) {
      fetchCategoryProducts();
    } else if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts, categoryUrlKey, isUserLoggedIn]);

  const renderHeader = () => (
    <div className={styles.headerContainer}>
      <Typography variant="h2" component="h2" className={styles.title}>{title}</Typography>
      {!hideViewAllButton && (
        <Button
          variant="outlined"
          color="black"
          href={categoryUrlKey ? getCategoryLink(categoryUrlKey) : '/courses'}
        >
          VIEW ALL
        </Button>
      )}
    </div>
  );

  const renderProductTileSkeleton = () => {
    const skeletonKeys = Array.from({ length: MAX_CATEGORY_PRODUCTS }, (_, i) => `skeleton-${i}`);
    return (
      skeletonKeys.map((key) => (
        <ProductTileSkeleton key={key} />
      ))
    );
  };

  const renderGrid = (customClassName?: string) => (
    <div className={`${styles.gridListContainer} ${customClassName || ''}`}>
      {isLoading ? renderProductTileSkeleton() : products.map((product) => (
        <ProductTile product={product} key={product.productId} />
      ))}
    </div>
  );

  const renderHorizontal = (customClassName?: string) => (
    <div className={customClassName || ''}>
      <HorizontalScrollContainer className={styles.horizontalScrollContainer}>
        <div className={styles.horizontalListContainer}>
          {isLoading ? renderProductTileSkeleton() : products.map((product) => (
            <ProductTile product={product} key={product.productId} />
          ))}
        </div>
      </HorizontalScrollContainer>
    </div>
  );

  const renderLoadingAndProducts = () => {
    if (layout === 'grid') {
      return renderGrid();
    }
    if (layout === 'horizontal') {
      return renderHorizontal();
    }
    if (layout === 'responsive') {
      return (
        <>
          {renderGrid(styles.responsiveGrid)}
          {renderHorizontal(styles.responsiveScroll)}
        </>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isError) {
      return <ErrorMessage message="Error in loading proudcts" />;
    }
    if (isLoading || products.length) {
      return renderLoadingAndProducts();
    }
    return null;
  };

  return (
    <section className={`${styles.categoryProductListContainer} ${className || ''}`}>
      {title ? renderHeader() : null}
      {renderContent()}
    </section>
  );
}
