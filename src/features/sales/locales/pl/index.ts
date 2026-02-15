import createSale from './create-sale';
import exportSales from './export-sales';
import importSales from './import-sales';
import sales from './sales';

export default {
  sales,
  createSale,
  importSales,
  exportSales,
} as const;
