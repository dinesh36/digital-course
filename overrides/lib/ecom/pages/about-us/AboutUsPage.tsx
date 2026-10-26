'use client';

import React from 'react';
import {
  BarChart3,
  Briefcase,
  Code,
  FileText,
  PenTool,
  RefreshCw,
  Search,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@/ui/components';
import styles from './AboutUs.module.scss';
import { BRAND_NAME } from '@/ecom/constants';

type MethodologyPhase = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

type ExpertRole = {
  id: string;
  title: string;
  Icon: LucideIcon;
};

type CommitmentItem = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const methodologyPhases: MethodologyPhase[] = [
  {
    id: 'foundations',
    title: 'Phase 1: Foundations',
    description: 'We start with core concepts, industry standards, and setup essentials required for real project work.',
    Icon: Target,
  },
  {
    id: 'core-methodologies',
    title: 'Phase 2: Core Methodologies',
    description: 'This section explains implementation patterns and advanced logic used in production-level systems.',
    Icon: Zap,
  },
  {
    id: 'practical-applications',
    title: 'Phase 3: Practical Applications',
    description: 'We cover practical workflows with project-style examples, debugging tactics, and optimization tips.',
    Icon: Code,
  },
  {
    id: 'success-kit',
    title: 'Phase 4: Success Kit',
    description: 'You finish with recap notes, interview prep, and a forward plan to keep your skills market-ready.',
    Icon: Trophy,
  },
];

const expertRoles: ExpertRole[] = [
  { id: 'fullstack', title: 'Senior Full-Stack Developers', Icon: Code },
  { id: 'designers', title: 'Lead UI/UX Designers', Icon: PenTool },
  { id: 'consultants', title: 'Business Consultants', Icon: Briefcase },
  { id: 'data-scientists', title: 'Senior Data Scientists', Icon: BarChart3 },
];

const expertRoleClassMap: Record<string, string> = {
  designers: 'designers',
  consultants: 'consultants',
  'data-scientists': 'dataScientists',
};

const commitmentItems: CommitmentItem[] = [
  {
    id: 'offline-ready',
    title: 'Offline Ready',
    description: 'Study searchable, high-resolution resources without depending on a constant internet connection.',
    Icon: Search,
  },
  {
    id: 'updated-content',
    title: '2026 Updated',
    description: 'Core learning resources are refreshed regularly to match modern tooling, frameworks, and practices.',
    Icon: RefreshCw,
  },
  {
    id: 'structured-data',
    title: 'Structured Data',
    description: 'Every course provides clear page counts, file sizes, and estimated completion time for planning.',
    Icon: FileText,
  },
];

function AboutUsPage() {
  const router = useRouter();

  const renderHeroSection = () => (
    <section className={styles.heroSection}>
      <Typography variant="h1" component="h1" className={styles.title}>
        About
        {' '}
        <span>{BRAND_NAME}</span>
      </Typography>
      <p className={styles.subtitle}>Empowering learners with premium, practical, and structured digital study resources.</p>
    </section>
  );

  const renderMissionSection = () => (
    <section className={styles.missionSection}>
      <Typography variant="h2" component="h2" className={styles.sectionTitle}>Our Mission & Vision</Typography>
      <div className={styles.sectionContent}>
        <p>
          We bridge the gap between academic theory and practical industry execution by turning expert knowledge into
          accessible learning material. Our mission is to make high-value professional insights available to any learner
          who wants to grow faster.
        </p>
        <p>
          We envision a learning ecosystem where location and background are no barriers. With focused and
          implementation-first material, we help developers, designers, and entrepreneurs build confidence and deliver
          real-world outcomes.
        </p>
      </div>
    </section>
  );

  const renderMethodologySection = () => (
    <section className={styles.methodologySection}>
      <div className={styles.sectionIntro}>
        <Typography variant="h2" component="h2" className={styles.sectionTitle}>
          The Precision Learning Methodology
        </Typography>
        <p>
          Our content is designed as a guided roadmap for retention and implementation, not just passive reading.
          Every course follows a practical 4-phase structure to move you from fundamentals to confident execution.
        </p>
      </div>
      <div className={styles.methodologyGrid}>
        {methodologyPhases.map((phase) => (
          <article key={phase.id} className={styles.methodCard}>
            <div className={styles.iconWrap}><phase.Icon /></div>
            <Typography variant="h3" component="h3" className={styles.cardTitle}>{phase.title}</Typography>
            <p>{phase.description}</p>
          </article>
        ))}
      </div>
    </section>
  );

  const renderExpertNetworkSection = () => (
    <section className={styles.expertSection}>
      <Typography variant="h2" component="h2" className={styles.sectionTitle}>Our Expert Network</Typography>
      <p className={styles.expertText}>
        The quality of our library is a direct reflection of the people who write it, as we believe the best teachers
        are those currently innovating in the industry. Our Expert Network consists of seasoned professionals—including
        Senior Full-Stack Developers, Lead UI/UX Designers, and Business Consultants—who distill years of experience into
        every page. Each author is vetted for their ability to explain not just the &ldquo;what,&rdquo; but the nuanced
        &ldquo;why&rdquo; behind every technical decision or business strategy. By learning from experts like Mitesh C.,
        Aishwarya M., and Rajesh Shah, you are gaining insights that are usually hidden behind years of trial and error
        in corporate roles. This mentorship-at-scale approach ensures that your learning is always relevant, practical,
        and highly valued by modern employers.
      </p>
      <div className={styles.expertGrid}>
        {expertRoles.map((role) => (
          <div
            key={role.id}
            className={`${styles.expertCard} ${expertRoleClassMap[role.id] ? styles[expertRoleClassMap[role.id]] : ''}`}
          >
            <div className={styles.iconWrap}><role.Icon /></div>
            <span>{role.title}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const renderCommitmentSection = () => (
    <section className={styles.commitmentSection}>
      <Typography variant="h2" component="h2" className={styles.sectionTitle}>Our Commitment to Excellence</Typography>
      <p className={styles.commitmentText}>
        In a world where technology shifts overnight, &ldquo;static&rdquo; learning is obsolete; therefore, Learn Sphere is
        committed to maintaining a living library of resources. We provide regular curriculum revisions for all 40 of
        our core products to ensure they reflect the most current 2026 industry trends, from React 19 patterns to the
        latest SEO algorithms. Every document is designed to be Offline Ready, allowing you to study high-resolution,
        searchable content without the distraction or requirement of a constant internet connection. Furthermore, we
        respect your time by providing transparent metrics for every course, including exact page counts, file sizes,
        and estimated completion times. This level of detail allows you to manage your professional development with
        the same precision that we use to build our guides.
      </p>
      <div className={styles.commitmentGrid}>
        {commitmentItems.map((item) => (
          <article key={item.id}>
            <div className={styles.commitmentHead}>
              <item.Icon />
              <Typography variant="h3" component="h3" className={styles.cardTitle}>{item.title}</Typography>
            </div>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );

  const renderCtaSection = () => (
    <section className={styles.ctaSection}>
      <Button onClick={() => router.push('/courses')}>Explore Our Courses</Button>
    </section>
  );

  return (
    <div className={styles.container}>
      {renderHeroSection()}
      {renderMissionSection()}
      {renderMethodologySection()}
      {renderExpertNetworkSection()}
      {renderCommitmentSection()}
      {renderCtaSection()}
    </div>
  );
}

export default AboutUsPage;
