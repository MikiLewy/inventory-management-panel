'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/api/clients/api';
import { PasswordInput } from '@/components/atoms/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/features/auth/providers/auth-providers';
import { SupabaseError } from '@/features/auth/types/supabase-error';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { login } from '../../../api/actions/auth';
import { executeServerAction } from '../../../utils/execute-server-action';

import { useLoginSchema } from './schema/login-schema';

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const t = useI18n();

  const user = useUser();

  const currentLocale = useCurrentLocale();

  const router = useRouter();

  const validationSchema = useLoginSchema();

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const accessToken = await executeServerAction(() => login(values.email, values.password));

      api.defaults.headers.common.Authorization = `${accessToken}`;

      router.push('/verify');
    } catch (error) {
      const supabaseError = error as SupabaseError;

      toast.error(supabaseError.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push(`/${currentLocale}/inventory`);
    }
  }, [user, form.formState.errors.root?.message, currentLocale]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
            <p className="text-muted-foreground text-base text-balance">{t('auth.login.subtitle')}</p>
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
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('auth.password')}
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline font-normal">
                      {t('auth.login.forgotYourPassword')}
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {t('auth.login.loginButton')}
          </Button>
          <div className="text-center text-sm">
            {t('auth.login.dontHaveAccount')}
            <Link href="/sign-up" className="underline underline-offset-4 ml-1">
              {t('auth.login.signUp')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
