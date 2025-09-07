import z from 'zod';

import { useI18n } from '@/locales/client';

export const useRevertSalesSchema = () => {
  const t = useI18n();

  return z.object({
    warehouseId: z.coerce.number({ invalid_type_error: t('validation.required') }).min(1, t('validation.required')),
  });
};
