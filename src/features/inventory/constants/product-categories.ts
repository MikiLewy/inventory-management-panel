import { CategoryType } from '@/server/db/types/enum/category-type';

export const productCategoriesTranslations = {
  [CategoryType.SNEAKERS]: 'inventory.productCategories.sneakers',
  [CategoryType.CLOTHING]: 'inventory.productCategories.clothing',
  [CategoryType.COLLECTIBLES]: 'inventory.productCategories.collectibles',
  [CategoryType.ACCESSORIES]: 'inventory.productCategories.accessories',
  [CategoryType.OTHER]: 'inventory.productCategories.other',
} as const;
