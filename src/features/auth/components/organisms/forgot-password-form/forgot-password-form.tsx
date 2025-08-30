'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { forgotPassword } from '@/features/auth/api/actions/auth';
import { SupabaseError } from '@/features/auth/types/supabase-error';
import { executeServerAction } from '@/features/auth/utils/execute-server-action';
import { useI18n } from '@/locales/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { useForgotPasswordSchema } from './schema/forgot-password-schema';

interface FormValues {
  email: string;
}

const defaultValues: FormValues = {
  email: '',
};

const ForgotPasswordForm = () => {
  const t = useI18n();

  const [isDisabledResendEmailButton, setIsDisabledResendEmailButton] = useState(false);

  const validationSchema = useForgotPasswordSchema();

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsDisabledResendEmailButton(true);
      await executeServerAction(() => forgotPassword(values.email));
      setTimeout(() => {
        setIsDisabledResendEmailButton(false);
      }, 60 * 1000);

      setIsDisabledResendEmailButton(true);
      toast.success(t('auth.forgotPassword.resetSuccess'));
    } catch (error) {
      const supabaseError = error as SupabaseError;

      toast.error(supabaseError.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">{t('auth.forgotPassword.title')}</h1>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isDisabledResendEmailButton}>
            {t('auth.forgotPassword.reset')}
          </Button>
          <div className="text-center text-sm">
            {t('auth.forgotPassword.alreadyHaveAccount')}
            <Link href="/login" className="underline underline-offset-4 ml-1">
              {t('auth.forgotPassword.login')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
