'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useCurrentLocale, useI18n } from '@/locales/client';

export const HeroSection = () => {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="mx-auto max-w-6xl text-center">
        <motion.h1
          className="mb-6 text-4xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}>
          {t('home.hero.title')} <span className="text-primary">{t('home.hero.titleBrand')}</span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}>
          {t('home.hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
          <Button size="lg" asChild>
            <Link href={`/${locale}/login`}>
              {t('home.hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
