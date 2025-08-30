import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useMarkAsSoldSchema = () => {
  const t = useI18n();

  return z.object({
    products: z.array(
      z.object({
        productId: z.number({ invalid_type_error: t('validation.required') }).min(1, t('validation.required')),
        soldPrice: z.coerce.number({ invalid_type_error: t('validation.required') }).min(0, t('validation.positive')),
        soldPlace: z.string().optional(),
        soldDate: z.date().optional(),
      }),
    ),
  });
};
