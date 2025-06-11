import { CategoryEnum } from '@/shared/api/types/enum/category';

export const productCategoriesTranslations = {
  [CategoryEnum.SNEAKERS]: 'inventory.productCategories.sneakers',
  [CategoryEnum.CLOTHING]: 'inventory.productCategories.clothing',
  [CategoryEnum.COLLECTIBLES]: 'inventory.productCategories.collectibles',
  [CategoryEnum.ACCESSORIES]: 'inventory.productCategories.accessories',
  [CategoryEnum.OTHER]: 'inventory.productCategories.other',
} as const;
