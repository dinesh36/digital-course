'use client';

import React from 'react';
import styles from './AboutDocumentSection.module.scss';
import { parseDescriptionContentUtil } from './parseDescriptionContentUtil';
import SuccessCircleIcon from '@/ui/icons/SuccessCircleIcon';

type Props = {
  description?: string;
};

export default function AboutDocumentSection({ description }: Props) {
  const { intro, points } = parseDescriptionContentUtil(description);

  const renderDocumentChecklist = () => (
    <ul className={styles.aboutDocumentList}>
      {points.map((point) => (
        <li key={point} className={styles.aboutDocumentListItem}>
          <SuccessCircleIcon className={styles.checkIcon} />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
  const renderDocumentCard = () => (
    <div className={styles.aboutDocumentCard}>
      {intro ? <p className={styles.aboutDocumentDescription}>{intro}</p> : null}
      {points.length ? renderDocumentChecklist() : null}
    </div>
  );

  if (!intro && points.length === 0) {
    return null;
  }

  return (
    <section className={styles.aboutDocumentSection}>
      <h3 className={styles.aboutDocumentTitle}>About This Document</h3>
      {renderDocumentCard()}
    </section>
  );
}
