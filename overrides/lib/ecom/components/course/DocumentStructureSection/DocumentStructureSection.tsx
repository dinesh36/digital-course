'use client';

import React from 'react';
import styles from './DocumentStructureSection.module.scss';
import { Accordion } from '@/ui/components/Accordion/Accordion';
import CheckIcon from '@/ui/icons/CheckIcon';
import { parseDocumentStructureContentUtil } from './parseDocumentStructureContentUtil';

type Props = {
  documentStructure?: string;
};

export default function DocumentStructureSection({ documentStructure }: Props) {
  const sections = parseDocumentStructureContentUtil(documentStructure);

  const accordionItems = sections.map((section, index) => ({
    id: `document-structure-${index}`,
    title: <span className={styles.documentRowTitle}>{section.title}</span>,
    rightContent: section.pages,
    content: (
      <ul className={styles.documentPoints}>
        {section.points.map((point) => (
          <li key={point} className={styles.documentPointItem}>
            <CheckIcon className={styles.checkIcon} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  if (!accordionItems.length) {
    return null;
  }

  return (
    <section className={styles.documentStructureSection}>
      <h3 className={styles.documentStructureTitle}>Document Structure</h3>
      <Accordion items={accordionItems} className={styles.accordion} itemClassName={styles.accordionItem} />
    </section>
  );
}
