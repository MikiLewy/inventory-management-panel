'use client';

import { motion } from 'framer-motion';
import { BarChart3, Package, ShoppingBag, Warehouse } from 'lucide-react';

import { useI18n } from '@/locales/client';

import { AnimatedElement } from '../atoms/animated-element';
import { StepCard } from '../molecules/step-card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const HowItWorksSection = () => {
  const t = useI18n();

  const steps = [
    {
      icon: Warehouse,
      titleKey: 'home.howItWorks.step1.title' as const,
      descriptionKey: 'home.howItWorks.step1.description' as const,
    },
    {
      icon: Package,
      titleKey: 'home.howItWorks.step2.title' as const,
      descriptionKey: 'home.howItWorks.step2.description' as const,
    },
    {
      icon: ShoppingBag,
      titleKey: 'home.howItWorks.step3.title' as const,
      descriptionKey: 'home.howItWorks.step3.description' as const,
    },
    {
      icon: BarChart3,
      titleKey: 'home.howItWorks.step4.title' as const,
      descriptionKey: 'home.howItWorks.step4.description' as const,
    },
  ];

  return (
    <section className="bg-muted/50 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedElement>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">{t('home.howItWorks.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('home.howItWorks.subtitle')}</p>
          </div>
        </AnimatedElement>

        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StepCard icon={step.icon} title={t(step.titleKey)} description={t(step.descriptionKey)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
