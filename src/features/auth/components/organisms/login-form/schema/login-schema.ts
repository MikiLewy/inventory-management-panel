'use client';

import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useLoginSchema = () => {
  const t = useI18n();

  return z.object({
    email: z
      .string()
      .email({ message: t('validation.email') })
      .min(1, { message: t('validation.required') }),
    password: z.string(),
  });
};
