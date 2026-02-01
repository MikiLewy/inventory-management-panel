import createProduct from './create-product';
import exportProducts from './export-products';
import importProducts from './import-products';
import inventory from './inventory';

export default {
  inventory,
  createProduct,
  importProducts,
  exportProducts,
} as const;
