import React from 'react';
import HeroSection from '@/ecom/components/home/HeroSection/HeroSection';
import OurCollection from '@/ecom/components/home/OurCollection/OurCollection';
import CategoryProducts from '@/ecom/components/product/CategoryProducts/CategoryProducts';
import CtaSection from '@/ecom/components/home/CtaSection/CtaSection';
import TestimonialsSection from '@/ecom/components/home/TestimonialsSection/TestimonialsSection';
import styles from './HomePage.module.scss';
import Heading from '@/ecom/components/home/Heading/Heading';

export default function HomePage() {
  const renderTrendingSection = () => (
    <div className={styles.trendingSection}>
      <Heading
        label="Trending Now"
        title="Featured Courses"
        subText="Hand-picked courses by industry experts to help you level up your skills."
      />
      <CategoryProducts categoryUrlKey="trending" layout="responsive" />
    </div>
  );

  return (
    <div className={styles.home}>
      <HeroSection />
      <OurCollection />
      {renderTrendingSection()}
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
