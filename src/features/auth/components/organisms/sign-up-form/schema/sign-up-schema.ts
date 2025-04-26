'use client';

import { z } from 'zod';

import { useI18n } from '@/locales/client';

export const useSignUpSchema = () => {
  const t = useI18n();

  return z
    .object({
      email: z
        .string()
        .email({ message: t('validation.email') })
        .min(1, { message: t('validation.required') }),
      password: z
        .string()
        .min(
          8,
          t('auth.validation.minChar', {
            chars: 8,
          }),
        )
        .regex(/[0-9]/, t('auth.validation.atLeast1Number'))
        .regex(/[a-z]/, t('auth.validation.atLeast1LowerCaseLetter'))
        .regex(/[A-Z]/, t('auth.validation.atLeast1UpperCaseLetter'))
        .regex(
          new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
          t('auth.validation.atLeast1SpecialCharacter'),
        ),
      passwordConfirmation: z.string().min(1, t('auth.validation.required')),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t('auth.validation.passwordMustMatch'),
      path: ['passwordConfirmation'],
    });
};
