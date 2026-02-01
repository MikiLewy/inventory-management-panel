import createProduct from './create-product';
import importProducts from './import-products';
import inventory from './inventory';

export default {
  inventory,
  createProduct,
  importProducts,
} as const;
