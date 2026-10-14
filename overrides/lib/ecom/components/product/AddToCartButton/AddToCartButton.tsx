'use client';

import React from 'react';
import { Product } from '@/ecom/types/product';
import { Button } from '@/ui/components';
import { addToCartThunk } from '@/ecom/store/cart/cart-thunk';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { CartIcon } from '@/ui/icons';
import { isProductInStock } from '@/ecom/utils';
import styles from '@/ecom/components/product/AddToCartButton/AddToCartButton.module.scss';

type AddToCartButtonProps = {
  product: Product;
  quantity: number;
  className?: string;
  onSuccess?: () => void;
  label?: string;
  addedLabel?: string;
  showCartIcon?: boolean;
};

export function AddToCartButton({
  product, quantity, className, onSuccess, label, addedLabel, showCartIcon = true,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const { addToCartItemSkus, cartItems } = useAppSelector((state) => state.cart);
  const isInStock = isProductInStock(product);
  const isLoading = addToCartItemSkus.includes(product.sku);
  const isPurchased = Boolean(product.isPurchased);
  const isAlreadyInCart = cartItems.some((item) => item.sku === product.sku);
  let buttonText = label ?? 'Add to Cart';

  if (isAlreadyInCart) {
    buttonText = addedLabel ?? 'Added to Cart';
  }

  if (isPurchased) {
    buttonText = 'Enrolled';
  }

  const handleClick = async () => {
    await dispatch(addToCartThunk({ quantity, product }));
    onSuccess?.();
  };

  return (
    <Button
      type="button"
      className={`${className} ${styles.addToCartButton}`}
      onClick={handleClick}
      disabled={isLoading || !isInStock || isAlreadyInCart || isPurchased}
      variant="contained"
      color="primary"
      dataTestId="add-to-cart-button"
    >
      {showCartIcon && !isPurchased ? <CartIcon /> : null}
      {isLoading ? 'Adding...' : buttonText}
    </Button>
  );
}
