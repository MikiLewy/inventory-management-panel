import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getCurrentLocale, getI18n } from '@/locales/server';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getI18n();
  const locale = await getCurrentLocale();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full text-2xl max-w-sm md:max-w-3xl">
        <div className={cn('flex flex-col gap-6')}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2 min-h-96">
              <div className="p-6 md:p-8 flex flex-col justify-center items-stretch">{children}</div>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="/auth.png"
                  width={500}
                  height={500}
                  alt="Brand Image"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            {t('auth.byClickingContinue')} <Link href={`/${locale}/terms-of-service`}>{t('auth.termsOfService')}</Link>{' '}
            {t('auth.and')} <Link href={`/${locale}/privacy-policy`}>{t('auth.privacyPolicy')}</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
