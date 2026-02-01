'use client';

import { motion } from 'framer-motion';
import { BarChart3, Building, ShoppingCart, Tags, Warehouse, Zap } from 'lucide-react';

import { useI18n } from '@/locales/client';

import { AnimatedElement } from '../atoms/animated-element';
import { FeatureCard } from '../atoms/feature-card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FeaturesSection = () => {
  const t = useI18n();

  const features = [
    {
      icon: Warehouse,
      titleKey: 'home.features.inventory.title' as const,
      descriptionKey: 'home.features.inventory.description' as const,
    },
    {
      icon: ShoppingCart,
      titleKey: 'home.features.sales.title' as const,
      descriptionKey: 'home.features.sales.description' as const,
    },
    {
      icon: BarChart3,
      titleKey: 'home.features.analytics.title' as const,
      descriptionKey: 'home.features.analytics.description' as const,
    },
    {
      icon: Building,
      titleKey: 'home.features.warehouse.title' as const,
      descriptionKey: 'home.features.warehouse.description' as const,
    },
    {
      icon: Tags,
      titleKey: 'home.features.categories.title' as const,
      descriptionKey: 'home.features.categories.description' as const,
    },
    {
      icon: Zap,
      titleKey: 'home.features.actions.title' as const,
      descriptionKey: 'home.features.actions.description' as const,
    },
  ];

  return (
    <section id="features" className="bg-muted/50 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedElement>
          <h2 className="mb-16 text-center text-3xl font-semibold md:text-4xl">{t('home.features.title')}</h2>
        </AnimatedElement>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard icon={feature.icon} title={t(feature.titleKey)} description={t(feature.descriptionKey)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
