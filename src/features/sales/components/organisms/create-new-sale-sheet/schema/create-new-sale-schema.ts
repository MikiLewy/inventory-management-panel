import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useCreateNewSaleSchema = () => {
  const t = useI18n();

  return z.object({
    name: z.string().min(1, t('validation.required')),
    sku: z.string().min(1, t('validation.required')),
    size: z.string().min(1, t('validation.required')),
    brand: z.string().optional(),
    categoryId: z.coerce.number({ invalid_type_error: t('validation.required') }).min(1, t('validation.required')),
    imageUrl: z.string().optional(),
    purchasePrice: z.coerce.number({ invalid_type_error: t('validation.required') }).min(0, t('validation.positive')),
    purchasePlace: z.string().optional(),
    purchaseDate: z.date().optional(),
    soldPrice: z.coerce.number({ invalid_type_error: t('validation.required') }).min(0, t('validation.positive')),
    soldPlace: z.string().optional(),
    soldDate: z.date().optional(),
  });
};
