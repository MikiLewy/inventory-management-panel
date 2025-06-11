import { ProductStatus } from '../api/types/enum/product-status';

export const productStatusTranslations = {
  [ProductStatus.IN_STOCK]: 'inventory.productStatus.inStock',
  [ProductStatus.IN_DELIVERY]: 'inventory.productStatus.inDelivery',
} as const;
