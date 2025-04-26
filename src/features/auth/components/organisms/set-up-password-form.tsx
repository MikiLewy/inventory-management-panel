'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordInput } from '@/components/atoms/password-input';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/locales/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

interface FormValues {
  password: string;
  passwordConfirm: string;
}

const defaultValues: FormValues = {
  password: '',
  passwordConfirm: '',
};

const SetUpPasswordForm = () => {
  const t = useI18n();

  const router = useRouter();

  const validationSchema = z.object({
    password: z.string(),
    passwordConfirm: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">{t('auth.setUpPassword.title')}</h1>
            <p className="text-muted-foreground text-base text-balance">{t('auth.setUpPassword.subtitle')}</p>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.passwordConfirm')}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {t('auth.setUpPassword.setPassword')}
          </Button>
          <Link href="/login" className="text-sm text-black font-normal text-center hover:underline">
            {t('auth.setUpPassword.returnToLogin')}
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SetUpPasswordForm;
