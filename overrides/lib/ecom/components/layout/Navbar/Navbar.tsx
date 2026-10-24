'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu, X,
} from 'lucide-react';
import { Button } from '@/ui/components';
import styles from './Navbar.module.scss';
import { SearchInputBox } from '@/ecom/components/SearchInputBox/SearchInputBox';
import { openAuthModal, openCartSlider } from '@/ecom/store/layout/layout-slice';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { AuthModal } from '@/ecom/components/auth';
import { useCartDisplayCount } from '@/ecom/components/layout';
import { CartIcon, UserIcon } from '@/ui/icons';
import CartSlider from '@/ecom/components/cart/CartSlider/CartSlider';
import { useIsMobile } from '@/ecom/utils';

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerMenuItems = useAppSelector((state) => state.layout.menus.headerMenu) || [];
  const { isUserLoggedIn, user } = useAppSelector((state) => state.auth);
  const { cartItemsCount, displayCount } = useCartDisplayCount();
  const userFirstName = user?.firstName?.trim() || 'Account';

  const handleCartClick = () => {
    if (pathname !== '/cart' && !isMobile) {
      dispatch(openCartSlider());
    } else {
      router.push('/cart');
    }
  };

  const handleUserClick = () => {
    if (isUserLoggedIn) {
      router.push('/account/dashboard');
    } else {
      dispatch(openAuthModal());
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const isActiveLink = (linkPath: string) => (
    pathname === linkPath
    || (linkPath !== '/' && pathname?.startsWith(`${linkPath}/`))
  );

  const renderCartIcon = () => (
    <Button type="button" aria-label="Cart" variant="clear" onClick={handleCartClick} className={styles.cartIconWrapper}>
      <CartIcon />
      {cartItemsCount > 0 && (
        <span className={styles.cartBadge}>{displayCount}</span>
      )}
    </Button>
  );

  const renderLinks = (className: string, closeMenu?: () => void) => headerMenuItems.map((link) => (
    <Link
      key={link.uid}
      href={link.link}
      className={`${className} ${isActiveLink(link.link) ? styles.activeLink : ''}`}
      onClick={closeMenu}
    >
      {link.name}
    </Link>
  ));

  const renderLogo = () => (
    <Link href="/" className={styles.logoLink} data-testid="link-home">
      <img src="/assets/images/digitalcourseio-logo.png" alt="Logo" className={styles.logoImage} />
    </Link>
  );

  const renderDesktopSearch = () => (
    <div className={styles.desktopSearch}>
      <SearchInputBox />
    </div>
  );

  const renderMobileSearch = () => (
    <div className={styles.mobileSearch}>
      <SearchInputBox />
    </div>
  );

  const renderAuthActions = () => (
    <div className={styles.actions}>
      {isUserLoggedIn ? (
        <Button variant="clear" className={styles.userBtn} onClick={handleUserClick}>
          <span className={styles.userInfo}>
            <UserIcon width={16} />
            <span className={styles.userName}>{userFirstName}</span>
          </span>
        </Button>
      ) : (
        <Button variant="contained" className={styles.signupBtn} onClick={handleUserClick}>
          Log in
        </Button>
      )}
    </div>
  );

  const renderMobileToggle = () => (
    <button
      type="button"
      className={styles.mobileToggle}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="Toggle mobile menu"
      data-testid="button-mobile-menu"
    >
      {isMobileMenuOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
    </button>
  );

  const renderMobileMenu = () => (isMobileMenuOpen ? (
    <div className={styles.mobileMenu} role="dialog" aria-modal="true">
      <div className={styles.mobileMenuInner}>
        {renderLinks(styles.mobileNavLink, () => setIsMobileMenuOpen(false))}
        <div className={styles.divider} />
        <div className={styles.mobileActions}>
          <Button variant="contained" className={styles.mobileActionBtn} onClick={handleUserClick}>
            {isUserLoggedIn ? 'My account' : 'Log in'}
          </Button>
        </div>
      </div>
    </div>
  ) : null);

  return (
    <>
      <nav className={styles.navbar} aria-label="Primary">
        <div className={styles.container}>
          <div className={styles.headerRow}>
            {renderLogo()}
            {renderDesktopSearch()}
            {renderMobileSearch()}
            <div className={styles.desktopNav}>
              <div className={styles.linksGroup}>{renderLinks(styles.navLink)}</div>
              {renderAuthActions()}
            </div>
            {renderCartIcon()}
            {renderMobileToggle()}
          </div>
        </div>
        {renderMobileMenu()}
        <AuthModal />
      </nav>
      <CartSlider />
    </>
  );
}

export default Navbar;
