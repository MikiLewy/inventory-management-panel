import auth from '@features/auth/index.client';
import inventory from '@features/inventory/index.client';
import sales from '@features/sales/index.client';
import statistics from '@features/statistics/index.client';

import common from './common';
import routes from './routes';
import validation from './validation';

export default {
  validation,
  common,
  routes,
  ...auth.locales.en,
  ...inventory.locales.en,
  ...sales.locales.en,
  ...statistics.locales.en,
} as const;
