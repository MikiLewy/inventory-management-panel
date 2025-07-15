'use client';

import { format as dateFormat } from 'date-fns';
import { pl } from 'date-fns/locale';
import { enUS } from 'date-fns/locale/en-US';

import { useCurrentLocale } from '@/locales/client';

interface Props {
  date: Date;
  format: string;
}

export const FormatDate = ({ date, format }: Props) => {
  const locale = useCurrentLocale();

  return <>{dateFormat(date, format, { locale: locale === 'pl' ? pl : enUS })}</>;
};

export const formatDate = (date: Date, format: string, locale?: 'en' | 'pl') => {
  return dateFormat(date, format, {
    locale: locale === 'pl' ? pl : enUS,
  });
};
