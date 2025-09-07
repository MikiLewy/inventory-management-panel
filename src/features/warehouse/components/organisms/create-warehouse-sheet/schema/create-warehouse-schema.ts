import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useCreateWarehouseSchema = () => {
  const t = useI18n();

  return z.object({
    name: z.string().min(1, t('validation.required')),
    address: z.string(),
    postCode: z.string(),
    city: z.string(),
    country: z.string(),
  });
};
