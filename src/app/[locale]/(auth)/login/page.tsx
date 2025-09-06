import { redirect } from 'next/navigation';

import LoginForm from '@/features/auth/components/organisms/login-form/login-form';
import { getCurrentLocale } from '@/locales/server';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

export default async function LoginPage() {
  const locale = await getCurrentLocale();

  const user = await getLoggedInUser();

  if (user) {
    redirect(`/${locale}/statistics`);
  }

  return <LoginForm />;
}
