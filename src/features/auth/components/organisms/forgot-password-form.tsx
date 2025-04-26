'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/locales/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { resetCredential } from '../../api/lib/auth';
import { executeServerAction } from '../../utils/execute-server-action';

interface FormValues {
  email: string;
}

const defaultValues: FormValues = {
  email: '',
};

const ForgotPasswordForm = () => {
  const t = useI18n();

  const router = useRouter();

  const validationSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    await executeServerAction(() => resetCredential(values.email));
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
          <Button type="submit" className="w-full">
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
