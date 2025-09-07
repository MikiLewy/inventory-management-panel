import { z } from 'zod';

import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import { useI18n } from '@/locales/client';
import { SizeUnit } from '@/types/enum/size-unit';

export const useCreateProductSchema = () => {
  const t = useI18n();

  return z.object({
    name: z.string().min(1, t('validation.required')),
    sku: z.string().min(1, t('validation.required')),
    euSizingType: z.literal('standard').or(z.literal('adidas')),
    status: z.nativeEnum(ProductStatus),
    brand: z.string().optional(),
    categoryId: z.coerce.number({ invalid_type_error: t('validation.required') }).min(1, t('validation.required')),
    sizeUnit: z.nativeEnum(SizeUnit),
    imageUrl: z.string().optional(),
    warehouseId: z.coerce.number({ invalid_type_error: t('validation.required') }).min(1, t('validation.required')),
    products: z.array(
      z.object({
        size: z.string().min(1, t('validation.required')),
        quantity: z.coerce
          .number({ invalid_type_error: t('validation.required') })
          .min(1, t('validation.required'))
          .positive(t('validation.positive')),
        purchasePrice: z.coerce
          .number({ invalid_type_error: t('validation.required') })
          .min(0, t('validation.positive')),
        purchasePlace: z.string().optional(),
        purchaseDate: z.date().optional(),
      }),
    ),
  });
};
