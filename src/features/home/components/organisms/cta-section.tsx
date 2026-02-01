'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/locales/client';

import { AnimatedElement } from '../atoms/animated-element';

export const CtaSection = () => {
  const t = useI18n();

  return (
    <section className="relative overflow-hidden bg-muted px-4 py-24">
      {/* Dot pattern background */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" className="fill-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative mx-auto max-w-4xl text-center">
        <AnimatedElement>
          <h2 className="mb-4 text-3xl font-semibold md:text-4xl">{t('home.cta.title')}</h2>
        </AnimatedElement>

        <AnimatedElement delay={0.1}>
          <p className="mb-10 text-lg text-muted-foreground">{t('home.cta.subtitle')}</p>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <Button size="lg" asChild>
            <Link href="/login">
              {t('home.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
};
