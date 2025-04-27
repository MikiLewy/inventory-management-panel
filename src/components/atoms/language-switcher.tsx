'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';

import { languageOptions } from '@/constants/languages';
import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client';
import { Language } from '@/types/enum/language';

import { Button } from '../ui/button';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropdownMenu } from '../ui/dropdown-menu';

export default function LanguageSwitcher() {
  const t = useI18n();

  const changeLanguage = useChangeLocale({ preserveSearchParams: true });

  const currentLocale = useCurrentLocale();

  const currentLanguage = languageOptions[currentLocale as Language];

  const handleChangeLanguage = (locale: Language) => {
    changeLanguage(locale);
    toast.success(t('common.languageChange'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Image
            src={currentLanguage?.icon ?? ''}
            alt={t(currentLanguage?.label ?? 'common.languages.en')}
            width={16}
            height={16}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(Language).map(locale => {
          const language = languageOptions[locale as Language];

          return (
            <DropdownMenuItem key={locale} onClick={() => handleChangeLanguage(locale)}>
              <Image
                src={language?.icon ?? ''}
                alt={t(language?.label ?? 'common.languages.en')}
                width={16}
                height={16}
              />
              <p>{t(language?.label ?? 'common.languages.en')}</p>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
