'use client';

import React from 'react';
import styles from './Heading.module.scss';
import { Button, Typography } from '@/ui/components';

type headingProps = {
  label: string;
  title: string;
  subText?: string;
  button?: {
    text: string;
    link: string;
  };
};

export default function Heading({
  label, title, subText, button,
}: headingProps) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionLabel}>{label}</span>
      <Typography variant="h2" component="h2" className={styles.heading}>{title}</Typography>
      <div className={styles.sectionDivider} />
      {subText ? <p className={styles.subText}>{subText}</p> : null}
      {button ? (
        <Button variant="contained" className={styles.primaryBtn} onClick={() => window.open(button.link, '_blank')}>
          {button.text}
        </Button>
      ) : null}
    </div>
  );
}
