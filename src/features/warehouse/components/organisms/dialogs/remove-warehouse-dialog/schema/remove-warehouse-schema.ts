import z from 'zod';

import { useI18n } from '@/locales/client';

export const useRemoveWarehouseSchema = (isRequired: boolean) => {
  const t = useI18n();

  return z.object({
    warehouseId: z.coerce
      .number({ invalid_type_error: t('validation.required') })
      .optional()
      .refine(value => (isRequired ? value !== undefined : value === undefined), {
        message: t('validation.required'),
      }),
  });
};
