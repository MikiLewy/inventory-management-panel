'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/locales/client';

export function ThemeSwitcher() {
  const t = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
        <span className="sr-only">{t('common.themeSwitcher.toggleTheme')}</span>
      </Button>
    );
  }

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all scale-100" />
      )}
      <span className="sr-only">{t('common.themeSwitcher.toggleTheme')}</span>
    </Button>
  );
}
