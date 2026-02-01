'use client';

import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { useCurrentLocale, useI18n } from '@/locales/client';

export const Footer = () => {
  const t = useI18n();
  const locale = useCurrentLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href={`/${locale}`} className="text-xl font-bold text-primary">
            Stoqio
          </Link>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('home.footer.privacy')}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('home.footer.terms')}
            </Link>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">{t('home.footer.copyright', { year: currentYear })}</p>
      </div>
    </footer>
  );
};
