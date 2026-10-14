import {
  ArrowRight,
  Star,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.scss';
import { Button } from '@/ui/components';

function HeroSection() {
  const router = useRouter();

  const renderBadge = () => (
    <div className={styles.badge}>
      <span className={styles.pingWrapper}>
        <span className={styles.pingCircle} />
        <span className={styles.pingDot} />
      </span>
      New Courses Added Daily
    </div>
  );

  const renderTitle = () => (
    <h1 className={styles.title}>
      Learn
      {' '}
      <span className={styles.titleGradient}>Limitless.</span>
      <br />
      Grow Endlessly.
    </h1>
  );

  const renderDescription = () => (
    <p className={styles.description}>
      Step into the future of learning. Master highly sought-after skills with immersive,
      beautifully designed courses tailored for you.
    </p>
  );

  const renderActions = () => (
    <div className={styles.actions}>
      <Button className={styles.primaryBtn} onClick={() => router.push('/courses')}>
        Explore Courses
        <ArrowRight className={styles.buttonIcon} />
      </Button>
    </div>
  );

  const renderSocialProof = () => (
    <div className={styles.socialProof}>
      <div className={styles.avatarGroup}>
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className={styles.avatarItem}>
            <img src={`https://i.pravatar.cc/100?u=${id}`} alt={`Student ${id}`} />
          </div>
        ))}
      </div>
      <p>
        Join
        <strong>50k+</strong>
        students learning today
      </p>
    </div>
  );

  const renderTopRatedCard = () => (
    <div className={`${styles.floatingCard} ${styles.topRatedCard}`}>
      <div className={styles.cardIconCircle}>
        <Star className={styles.cardIcon} />
      </div>
      <div>
        <p className={styles.cardLabel}>Top Rated</p>
        <p className={styles.cardValue}>4.9/5 Average</p>
      </div>
    </div>
  );

  const renderActiveLearnersCard = () => (
    <div className={`${styles.floatingCard} ${styles.activeLearnersCard}`}>
      <div className={styles.cardIconCirclePrimary}>
        <Users className={styles.cardIconPrimary} />
      </div>
      <div>
        <p className={styles.cardLabel}>Active Learners</p>
        <p className={styles.cardValue}>50,000+</p>
      </div>
    </div>
  );

  const renderHeroImage = () => (
    <div className={styles.heroImage}>
      <div className={styles.gradientFrame} />
      <div className={styles.imageWrapper}>
        <img src="/assets/images/courses/hero-bg.png" alt="Abstract learning and growth concept" />
        {renderTopRatedCard()}
        {renderActiveLearnersCard()}
      </div>
    </div>
  );

  return (
    <section className={styles.heroSectionContainer}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          {renderBadge()}
          {renderTitle()}
          {renderDescription()}
          {renderActions()}
          {renderSocialProof()}
        </div>
        {renderHeroImage()}
      </div>
    </section>
  );
}

export default HeroSection;
