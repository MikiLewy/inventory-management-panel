import { NextFetchEvent, NextRequest } from 'next/server';
import { createI18nMiddleware } from 'next-international/middleware';

import { CustomMiddleware } from './custom-middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
});

const internationalizationMiddleware = (request: NextRequest) => {
  return I18nMiddleware(request);
};

export function withInternationalizationMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const internalization = internationalizationMiddleware(request);

    return middleware(request, event, internalization);
  };
}
