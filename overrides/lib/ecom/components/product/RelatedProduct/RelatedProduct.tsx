'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/ecom/types/product';
import { getRelatedProductsList } from '@/ecom/services/product/related-products.service';
import CategoryProducts from '@/ecom/components/product/CategoryProducts/CategoryProducts';
import styles from '@/ecom/components/product/RelatedProduct/RelatedProduct.module.scss';
import { useAppSelector } from '@/ecom/store/hooks';

type ProductSection = {
    title: string;
    products: Product[] | null;
};

interface RelatedProductProps {
    sku: string;
}

export function RelatedProduct({ sku }: RelatedProductProps) {
  const [sections, setSections] = useState<ProductSection[]>([]);
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  const fetchRelatedProducts = async (relatedProductsSku: string) => {
    const product = await getRelatedProductsList(relatedProductsSku, isUserLoggedIn);
    if (product) {
      setSections(
        [
          { title: 'You May Also Like', products: product.related },
          { title: 'Better Together', products: product.upsell },
          { title: 'Don’t Forget These', products: product.crosssell },
        ].filter(({ products }) => products && products.length > 0),
      );
    }
  };

  useEffect(() => {
    fetchRelatedProducts(sku);
  }, [sku, isUserLoggedIn]);

  return (
    <div className={styles.relatedProduct}>
      {sections.map((section, index) => (section.products && section.products.length > 0 ? (
        <CategoryProducts
          key={section.title}
          className={index !== 0 ? styles.categoryProductsListItem : ''}
          products={section.products}
          title={section.title}
        />
      ) : null))}
    </div>
  );
}
