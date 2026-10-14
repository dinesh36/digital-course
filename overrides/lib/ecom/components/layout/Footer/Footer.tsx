'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Footer.module.scss';
import { useAppSelector } from '@/ecom/store/hooks';
import { Link } from '@/ecom/components/layout';
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  SendIcon,
  YouTubeIcon,
} from '@/ui/icons';
import { AppForm, FieldGroup, TextField } from '@/ui/form';
import emailSubscribe from '@/ecom/services/subscription/subscribe.service';

export const iconMap = {
  instagram: <InstagramIcon />,
  pinterest: <PinterestIcon />,
  youtube: <YouTubeIcon />,
  facebook: <FacebookIcon />,
};

export function Footer() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { footerMenu, socialLinks, policyLinks } = useAppSelector(
    (state) => state.layout.menus,
  );

  const form = useForm({ mode: 'onSubmit', defaultValues: { email: '' } });
  const emailValue = form.watch('email');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue || '');

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    try {
      await emailSubscribe(data.email);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSocialIcons = () => (
    <div className={styles.social}>
      {socialLinks.map((item) => (
        <Link
          key={item.uid}
          href={item.link}
          target={item.openInNewTab ? '_blank' : undefined}
          aria-label={item.name}
          rel={item.openInNewTab ? 'noreferrer' : undefined}
        >
          {iconMap[item.name.toLowerCase() as keyof typeof iconMap]}
        </Link>
      ))}
    </div>
  );

  const renderLogo = () => (
    <Link href="/" className={styles.logo}>
      <img src="/assets/images/digitalcourseio-logo.png" alt="Logo" className={styles.logoImage} />
    </Link>
  );

  const renderBrand = () => (
    <div className={styles.brandColumn}>
      {renderLogo()}
      <p className={styles.brandDescription}>
        Empowering learners worldwide with engaging, high-quality courses designed for the modern student.
      </p>
      {renderSocialIcons()}
    </div>
  );

  const renderCategoryColumns = () => footerMenu.map((category) => (
    <div key={category.name}>
      <h4 className={styles.sectionHeading}>{category.name}</h4>

      <ul>
        {category.children?.map((child) => (
          <li key={`${category.name}-${child.link}`}>
            <Link href={child.link} className={styles.footerLink}>
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));

  const renderSubscribe = () => (
    <div>
      <h4 className={styles.sectionHeading}>Subscribe to Newsletter</h4>
      <p className={styles.subscribeText}>
        Get the latest news and updates on courses.
      </p>
      <div className={styles.subscribeRow}>
        <AppForm form={form} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup
            formFields={[
              {
                name: 'email',
                type: 'email',
                placeholder: 'Email',
                icon: isValidEmail ? (
                  <SendIcon />
                ) : (
                  <EmailIcon />
                ),
                renderer: TextField,
                rules: {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                },
                disabled: isSubmitting,
              },
            ]}
            displayLabel={false}
            fieldSize="medium"
          />
        </AppForm>
      </div>
    </div>
  );

  const renderBottomBar = () => (
    <div className={styles.bottomBar}>
      <span>
        © 2026 EduVerse Inc. All rights reserved.
      </span>

      <div className={styles.bottomLinks}>
        {policyLinks.map((child) => (
          <Link key={child.link} href={child.link}>
            {child.name}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <footer className={styles.sparkleFooter}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {renderBrand()}
          {renderCategoryColumns()}
          {renderSubscribe()}
        </div>
        {renderBottomBar()}
      </div>
    </footer>
  );
}
