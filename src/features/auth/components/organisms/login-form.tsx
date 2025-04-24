'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordInput } from '@/components/atoms/password-input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SignInProviders from '@/features/auth/components/molecules/sign-in-providers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { login } from '../../api/actions/auth';
import { executeServerAction } from '../../utils/execute-server-action';

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();

  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    await executeServerAction(() => login(values.email, values.password));

    router.push('/inventory');
  };

  return (
    <CardContent className="grid p-0 md:grid-cols-2">
      <Form {...form}>
        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-base text-balance">Login to your Acme Inc account</p>
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                      Password{' '}
                      <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline font-normal">
                        Forgot your password?
                      </a>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <SignInProviders />
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </Form>
      <div className="bg-muted relative hidden md:block">
        <img
          src="/auth.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </CardContent>
  );
};

export default LoginForm;
