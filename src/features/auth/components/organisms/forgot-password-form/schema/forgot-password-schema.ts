'use client';

import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useForgotPasswordSchema = () => {
  const t = useI18n();

  return z.object({
    email: z.string().email({ message: t('validation.email') }),
  });
};
