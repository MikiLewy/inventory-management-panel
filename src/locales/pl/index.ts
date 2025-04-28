import auth from '@features/auth/index.client';
import inventory from '@features/inventory/index.client';

import common from './common';
import routes from './routes';
import validation from './validation';

export default {
  validation,
  common,
  routes,
  ...auth.locales.pl,
  ...inventory.locales.pl,
} as const;
