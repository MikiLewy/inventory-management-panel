import auth from '@features/auth/index.client';
import home from '@features/home/index.client';
import inventory from '@features/inventory/index.client';
import sales from '@features/sales/index.client';
import statistics from '@features/statistics/index.client';
import warehouse from '@features/warehouse/index.client';

import common from './common';
import importExport from './import-export';
import legal from './legal';
import routes from './routes';
import validation from './validation';

export default {
  validation,
  common,
  routes,
  legal,
  importExport,
  ...auth.locales.pl,
  ...home.locales.pl,
  ...inventory.locales.pl,
  ...sales.locales.pl,
  ...statistics.locales.pl,
  ...warehouse.locales.pl,
} as const;
