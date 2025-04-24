import { Language } from '@/types/enum/language';

export const authRoutesWithoutLanguage = ['/login', '/forgot-password', '/set-up-password', '/update-password'];

export const authRoutesWithLanguage = authRoutesWithoutLanguage.flatMap(route =>
  Object.values(Language)?.map(lang => `/${lang}${route}`),
);

export const authRoutes = authRoutesWithoutLanguage.concat(authRoutesWithLanguage);
