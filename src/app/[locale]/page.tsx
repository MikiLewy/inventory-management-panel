import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getI18n } from '@/locales/server';

export default async function Home() {
  const t = await getI18n();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 lg:p-0 lg:max-w-5xl lg:mx-auto font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-7 row-start-2 items-center text-center ">
        <h1 className="text-4xl lg:text-6xl/18 font-bold ">
          {t('common.home.title')} <span className="text-primary">Stoqio</span>
        </h1>
        <Button size="lg" asChild>
          <Link href="/login">{t('common.home.getStarted')}</Link>
        </Button>
      </main>
    </div>
  );
}
