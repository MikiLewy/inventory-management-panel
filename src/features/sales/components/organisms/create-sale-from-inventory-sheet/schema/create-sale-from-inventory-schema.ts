import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useCreateSaleFromInventorySchema = () => {
  const t = useI18n();

  return z.object({
    products: z.array(
      z.object({
        id: z.coerce.number({ invalid_type_error: t('validation.required') }).min(1, t('validation.required')),
        soldPrice: z.coerce.number({ invalid_type_error: t('validation.required') }).min(0, t('validation.positive')),
        soldDate: z.date().optional(),
        soldPlace: z.string().optional(),
      }),
    ),
  });
};
