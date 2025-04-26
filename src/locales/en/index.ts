import auth from '@features/auth/index.client';

import common from './common';
import validation from './validation';

export default {
  validation,
  common,
  ...auth.locales.en,
} as const;
