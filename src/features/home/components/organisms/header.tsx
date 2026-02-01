'use client';

import Link from 'next/link';

import LanguageSwitcher from '@/components/atoms/language-switcher';
import { ThemeSwitcher } from '@/components/atoms/theme-switcher';
import { Button } from '@/components/ui/button';
import { useCurrentLocale, useI18n } from '@/locales/client';

export const Header = () => {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href={`/${locale}`} className="text-xl font-bold text-primary">
          Stoqio
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button asChild className="ml-2">
            <Link href={`/${locale}/login`}>{t('home.header.cta')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
