import { Language } from '@/types/enum/language';

export const languagesTranslations = {
  [Language.EN]: 'common.languages.en',
  [Language.PL]: 'common.languages.pl',
} as const;

type LanguagesTranslationsValues = (typeof languagesTranslations)[Language];

export const languageOptions = Object.values(Language).reduce(
  (acc, lang) => {
    acc[lang] = {
      icon: `/assets/${lang}_flag.svg`,
      label: languagesTranslations[lang],
      shortcut: lang,
    };
    return acc;
  },
  {} as Record<Language, { icon: string; label: LanguagesTranslationsValues; shortcut: string }>,
);
