import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronDown, LogIn, Heart,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ProductCategory } from '@/ecom/types/productCategory';
import styles from './MobileDrawer.module.scss';
import { Button } from '@/ui/components';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { openAuthModal } from '@/ecom/store/layout/layout-slice';
import { logoutThunk } from '@/ecom/store/auth/auth-thunk';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navigationData: ProductCategory[];
}

function MobileDrawer({ open, onClose, navigationData }: MobileDrawerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line no-undef
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const toggleCategory = (name: string) => {
    setExpandedCategory((prev) => (prev === name ? null : name));
  };

  const getItems = (cat: typeof navigationData[number]) => {
    if (!cat.children) return [];

    return cat.children.flatMap((childCategory) => [
      { ...childCategory, isHeading: true },
      ...(childCategory.children || []).map((grandChildCategory) => ({ ...grandChildCategory, isHeading: false })),
    ]);
  };

  const handleLogIn = () => {
    dispatch(openAuthModal());
    router.push('/');
    dispatch(onClose);
  };

  const openLink = (link: string | undefined) => {
    if (link) {
      router.push(link);
      dispatch(onClose);
    }
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
    router.push('/');
    dispatch(onClose);
  };

  const renderOverlay = () => (
    <motion.div
      className={styles.drawerOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
  );

  const renderHeader = () => (
    <div className={styles.header}>
      <div className={styles.logoWrap}>
        <Heart className={styles.logoIcon} />
        <span className={styles.logoText}>Sparkle & Style</span>
      </div>

      <Button variant="clear" onClick={onClose} className={styles.closeBtn}>
        <X />
      </Button>
    </div>
  );

  const renderAuthSection = () => (
    <div className={styles.authSection}>
      <Button variant="contained" className={styles.authButton} onClick={handleLogIn}>
        <LogIn />
        Login / Sign Up
      </Button>
    </div>
  );

  const renderLoginAccountMenu = () => (
    <div className={styles.accountSection}>
      <Button
        type="button"
        variant="contained"
        color="primary"
        className={styles.authButton}
        onClick={() => openLink('/account')}
      >
        My Account
      </Button>
      <Button type="button" variant="outlined" color="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );

  const renderAccordionItems = (
    items: ReturnType<typeof getItems>,
  ) => (
    <>
      {items.map((item) => {
        if ('isHeading' in item && item.isHeading) {
          return (
            <Link
              key={item.uid}
              href={item.link}
              className={`${styles.heading} ${pathname === item.link ? styles.active : ''}`}
              onClick={onClose}
            >
              {item.name}
            </Link>
          );
        }

        return (
          <Link
            key={item.uid}
            href={item.link}
            className={`${styles.itemLink} ${pathname === item.link ? styles.active : ''}`}
            onClick={onClose}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );

  const renderCategories = () => (
    <div className={styles.categories}>
      {navigationData.map((cat) => {
        const items = getItems(cat);
        const isExpanded = expandedCategory === cat.name;
        const badge = cat.name.includes('New Arrivals') ? 'New' : undefined;

        return (
          <div key={cat.name}>
            <Button variant="clear" className={styles.categoryButton} onClick={() => toggleCategory(cat.name)}>
              <span className={styles.categoryLeft}>
                {cat.name}
                {badge && (<span className={styles.badge}>{badge}</span>)}
              </span>

              <ChevronDown className={`${styles.chevron} ${isExpanded ? styles.rotate : ''}`} />
            </Button>

            <AnimatePresence>
              {isExpanded && (
              <motion.div
                className={styles.accordionContent}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {renderAccordionItems(items)}
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  const renderDrawer = () => (
    <motion.div
      className={styles.drawer}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      role="dialog"
      aria-modal="true"
    >
      {renderHeader()}
      {renderCategories()}
      {isUserLoggedIn ? renderLoginAccountMenu() : renderAuthSection()}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {renderOverlay()}
          {renderDrawer()}
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;
