import React, { useState } from 'react';
import { DownArrowIcon, UpArrowIcon } from '@/ui/icons';
import styles from './Accordion.module.scss';
import { Button, Typography } from '@/ui/components';

type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  rightContent?: React.ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
    activeItem?: string;
    onChange?: (id: string) => void;
    className?: string;
    itemClassName?: string;
};

export function Accordion({
  items, activeItem: controlledActiveItem, onChange, className, itemClassName,
}: AccordionProps) {
  const [internalActiveItem, setInternalActiveItem] = useState(items[0]?.id ?? '');
  const isControlled = controlledActiveItem !== undefined && onChange !== undefined;
  const activeItem = isControlled ? controlledActiveItem : internalActiveItem;

  const handleItemChange = (id: string) => {
    if (isControlled) {
      onChange?.(id);
    } else {
      setInternalActiveItem((prev) => (prev === id ? '' : id));
    }
  };

  const renderAccordionTitle = (accordionItem: AccordionItem) => {
    const { id, title, rightContent } = accordionItem;
    const isActive = activeItem === id;

    return (
      <Button
        variant="clear"
        className={`${styles.accordionTitle} ${isActive ? styles.active : ''}`}
        onClick={() => handleItemChange(id)}
      >
        <span className={styles.titleBlock}>
          {typeof title === 'string' ? <Typography variant="h2" component="h2">{title}</Typography> : title}
        </span>
        <span className={styles.metaBlock}>
          {rightContent ? <span className={styles.metaText}>{rightContent}</span> : null}
          <span className={styles.arrow}>
            {isActive ? <UpArrowIcon width={18} height={18} /> : <DownArrowIcon width={18} height={18} />}
          </span>
        </span>
      </Button>
    );
  };

  const renderContent = (accordionItem: AccordionItem) => accordionItem.id === activeItem
      && <div className={styles.accordionContent}>{accordionItem.content}</div>;

  return (
    <div className={`${styles.accordionContainer} ${className || ''}`.trim()}>
      {items.map((accordionItem) => (
        <div key={accordionItem.id} className={`${styles.accordionItem} ${itemClassName || ''}`.trim()}>
          {renderAccordionTitle(accordionItem)}
          {renderContent(accordionItem)}
        </div>
      ))}
    </div>
  );
}
