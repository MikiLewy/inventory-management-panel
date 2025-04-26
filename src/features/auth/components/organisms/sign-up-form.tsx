'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordInput } from '@/components/atoms/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SignInProviders from '@/features/auth/components/molecules/sign-in-providers';
import { useI18n } from '@/locales/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { signUp } from '../../api/actions/auth';
import { executeServerAction } from '../../utils/execute-server-action';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const defaultValues: FormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const LoginForm = () => {
  const t = useI18n();

  const router = useRouter();

  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    passwordConfirm: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    await executeServerAction(() => signUp(values.email, values.password));

    router.push('/inventory');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">{t('auth.signUp.title')}</h1>
            <p className="text-muted-foreground text-base text-balance">{t('auth.signUp.subtitle')}</p>
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
            {t('auth.signUp.signUpButton')}
          </Button>
          <SignInProviders />
          <div className="text-center text-sm">
            {t('auth.signUp.alreadyHaveAccount')}
            <Link href="/login" className="underline underline-offset-4 ml-1">
              {t('auth.signUp.login')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
