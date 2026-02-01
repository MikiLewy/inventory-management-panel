'use client';

import { BarChart3, LucideIcon, Package, ShoppingCart } from 'lucide-react';

import { useI18n } from '@/locales/client';

import { AnimatedElement } from '../atoms/animated-element';
import { FeatureShowcase } from '../molecules/feature-showcase';

interface Showcase {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  screenshotLabel: string;
  screenshotPlaceholder: string;
  imagePosition?: 'left' | 'right';
  imageSrc?: string;
  imageSrcDark?: string;
}

export const FeatureShowcasesSection = () => {
  const t = useI18n();

  const showcases: Showcase[] = [
    {
      icon: Package,
      title: t('home.showcases.inventory.title'),
      description: t('home.showcases.inventory.description'),
      features: [
        t('home.showcases.inventory.feature1'),
        t('home.showcases.inventory.feature2'),
        t('home.showcases.inventory.feature3'),
        t('home.showcases.inventory.feature4'),
      ],
      screenshotLabel: t('home.showcases.inventory.screenshot'),
      screenshotPlaceholder: t('home.screenshots.placeholder'),
      imageSrc: '/assets/home/inventory.png',
      imageSrcDark: '/assets/home/inventory-dark.png',
    },
    {
      icon: ShoppingCart,
      title: t('home.showcases.sales.title'),
      description: t('home.showcases.sales.description'),
      features: [
        t('home.showcases.sales.feature1'),
        t('home.showcases.sales.feature2'),
        t('home.showcases.sales.feature3'),
        t('home.showcases.sales.feature4'),
      ],
      screenshotLabel: t('home.showcases.sales.screenshot'),
      screenshotPlaceholder: t('home.screenshots.placeholder'),
      imageSrc: '/assets/home/sales.png',
      imagePosition: 'left',
      imageSrcDark: '/assets/home/sales-dark.png',
    },
    {
      icon: BarChart3,
      title: t('home.showcases.statistics.title'),
      description: t('home.showcases.statistics.description'),
      features: [
        t('home.showcases.statistics.feature1'),
        t('home.showcases.statistics.feature2'),
        t('home.showcases.statistics.feature3'),
        t('home.showcases.statistics.feature4'),
      ],
      screenshotLabel: t('home.showcases.statistics.screenshot'),
      screenshotPlaceholder: t('home.screenshots.placeholder'),
      imageSrc: '/assets/home/statistics.png',
      imageSrcDark: '/assets/home/statistics-dark.png',
    },
  ];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedElement>
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">{t('home.showcases.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('home.showcases.subtitle')}</p>
          </div>
        </AnimatedElement>

        <div className="space-y-24">
          {showcases.map(showcase => (
            <FeatureShowcase
              key={showcase.title}
              icon={showcase.icon}
              title={showcase.title}
              description={showcase.description}
              features={showcase.features}
              screenshotLabel={showcase.screenshotLabel}
              screenshotPlaceholder={showcase.screenshotPlaceholder}
              imagePosition={showcase.imagePosition}
              imageSrc={showcase.imageSrc}
              imageSrcDark={showcase.imageSrcDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
