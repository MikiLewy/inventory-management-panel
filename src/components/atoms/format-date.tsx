'use client';

import { format as dateFormat, Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';

interface Props {
  date: Date;
  format: string;
  locale?: Locale;
}

export const FormatDate = ({ date, format, locale }: Props) => {
  return <>{dateFormat(date, format, { locale: locale || enUS })}</>;
};

export const formatDate = (date: Date, format: string, locale?: Locale) => {
  return dateFormat(date, format, {
    locale: locale || enUS,
  });
};
