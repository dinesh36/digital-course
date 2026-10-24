import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './DesktopMenu.module.scss';
import { ProductCategory } from '@/ecom/types/productCategory';
import { getCategoryLink } from '@/ecom/utils/categoryUtils';

interface DesktopMenuProps {
  navigationData: ProductCategory[];
  activeMenu: string | null;
  dropdownMenu: string | null;
  openMenu: (name: string) => void;
  closeMenus: () => void;
  cancelClose: () => void;
}

function DesktopMenu({
  navigationData, activeMenu, dropdownMenu, openMenu, closeMenus, cancelClose,
}: DesktopMenuProps) {
  const renderDropdown = (cat: ProductCategory) => (
    <AnimatePresence>
      {dropdownMenu === cat.name && (
        <motion.div
          className={styles.dropdown}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          onMouseEnter={cancelClose}
          onMouseLeave={closeMenus}
        >
          {cat.children?.map((item) => (
            <Link key={item.id} href={getCategoryLink(item.urlKey)} className={styles.dropdownItem}>
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderDesktopNav = () => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
    <nav className={styles.desktopNav} role="menubar">
      {navigationData.map((cat) => {
        const isOpen = activeMenu === cat.name || dropdownMenu === cat.name;
        const hasMegaMenu = cat.children?.some((c) => c.children?.length);
        const badge = cat.name.includes('New Arrivals') ? 'New' : undefined;
        return (
          <div key={cat.name} className={styles.navItem} onMouseEnter={() => openMenu(cat.name)} onMouseLeave={closeMenus}>
            <button type="button" className={`${styles.navButton} ${isOpen ? styles.active : ''}`}>
              {cat.name}
              {badge && (<span className={styles.badgeSmall}>{badge}</span>)}
              <span className={styles.underline} />
            </button>
            {!hasMegaMenu && cat.children && renderDropdown(cat)}
          </div>
        );
      })}
    </nav>
  );

  const renderLeftGrid = (cat: ProductCategory) => (
    <div className={styles.leftGrid}>
      {cat.children?.map((sub) => (
        <div key={sub.name}>
          <h4 className={styles.heading}>{sub.name}</h4>
          <ul className={styles.list}>
            {sub.children?.map((item) => (
              <li key={item.name}>
                <Link href={getCategoryLink(item.urlKey)} className={styles.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderCategoryText = (description?: string) => {
    if (!description) return { title: '', subtitle: '' };
    const decoded = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const titleMatch = decoded.match(/<h3>(.*?)<\/h3>/i);
    const subtitleMatch = decoded.match(/<p>(.*?)<\/p>/i);
    return { title: titleMatch?.[1] ?? '', subtitle: subtitleMatch?.[1] ?? '' };
  };

  const renderFeaturedCard = (cat: ProductCategory) => {
    if (!cat.image) return null;
    const { title, subtitle } = renderCategoryText(cat.description);

    return (
      <div className={styles.featured}>
        <Link href={getCategoryLink(cat.urlKey)} className={styles.featuredLink}>
          <div className={styles.featuredCard}>
            <img src={cat.image} alt={cat.name} className={styles.featuredImage} />
            <div className={styles.featuredOverlay} />
            <div className={styles.featuredContent}>
              <p className={styles.featuredTitle}>{title || cat.name}</p>
              <p className={styles.featuredSubtitle}>{subtitle}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const renderMegaMenus = () => navigationData
    .filter((c) => c.children?.some((sub) => sub.children?.length))
    .map((cat) => (
      <div key={`mega-${cat.name}`} onMouseEnter={cancelClose} onMouseLeave={closeMenus}>
        <AnimatePresence>
          {activeMenu === cat.name && (
            <motion.div
              className={styles.megaMenu}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`${styles.container} sparkle-container`}>
                <div className={styles.gridWrapper}>
                  {renderLeftGrid(cat)}
                  {renderFeaturedCard(cat)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));

  return (
    <>
      {renderDesktopNav()}
      {renderMegaMenus()}
    </>
  );
}

export default DesktopMenu;
