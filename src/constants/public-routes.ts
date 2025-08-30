import { Language } from '@/types/enum/language';

export const publicRoutesWithoutLanguage = [
  '/',
  '/login',
  '/sign-up',
  '/forgot-password',
  '/set-up-password',
  '/update-password',
];

export const publicRoutesWithLanguage = publicRoutesWithoutLanguage.flatMap(route =>
  Object.values(Language)?.map(lang => (route === '/' ? `/${lang}` : `/${lang}${route}`)),
);

export const publicRoutes = publicRoutesWithoutLanguage.concat(publicRoutesWithLanguage);
