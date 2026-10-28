'use client';

import {
  User, Heart, ShoppingBag,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/ui/components';
import styles from './NavbarActions.module.scss';
import { SearchInputBox } from '@/ecom/components/SearchInputBox/SearchInputBox';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { openAuthModal, openCartSlider } from '@/ecom/store/layout/layout-slice';
import { useCartDisplayCount } from '@/ecom/components/layout';
import { useIsMobile } from '@/ecom/utils';

function NavbarActions() {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { cartItemsCount, displayCount } = useCartDisplayCount();
  const wishlistCount = useAppSelector((state) => state.wishlist.productIds.length);

  const handleUserClick = () => {
    if (isUserLoggedIn) {
      router.push('/account');
    } else {
      dispatch(openAuthModal());
    }
  };

  const handleCartClick = () => {
    if (pathname !== '/cart' && !isMobile) {
      dispatch(openCartSlider());
    } else {
      router.push('/cart');
    }
  };

  const renderUserIcon = () => (
    <Button variant="clear" className="cursor-pointer" aria-label="Account" onClick={handleUserClick}>
      <User />
    </Button>
  );

  const renderHeartIcon = () => (
    <Button variant="clear" className={styles.wishlist} aria-label="Wishlist" onClick={() => router.push('/wishlist')}>
      <Heart />
      {wishlistCount > 0 && <span className={styles.sparkleBadge}>{wishlistCount}</span>}
    </Button>
  );

  const renderCartIcon = () => (
    <Button variant="clear" className={styles.cartBtn} aria-label="Cart" onClick={handleCartClick}>
      <ShoppingBag />
      {cartItemsCount > 0 && <span className={styles.sparkleBadge}>{displayCount}</span>}
    </Button>
  );

  const renderRightMenuIcons = () => (
    <ul className={styles.rightMenuItemsContainer}>
      <li>{renderUserIcon()}</li>
      <li>{renderHeartIcon()}</li>
      <li>{renderCartIcon()}</li>
    </ul>
  );

  return (
    <div className={styles.navbarActions}>
      <SearchInputBox />
      {renderRightMenuIcons()}
    </div>
  );
}

export default NavbarActions;
