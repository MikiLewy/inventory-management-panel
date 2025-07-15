import { Metadata } from 'next';
import { ReactNode } from 'react';

import Page from '@/components/organisms/page/page';
import StatisticsPageHeaderActions from '@/features/statistics/components/organisms/statistics-page-header-actions';
import { getI18n } from '@/locales/server';

export const metadata: Metadata = {
  title: 'Statistics',
  description: 'Statistics',
};

const StatisticsLayout = async ({
  children,
  profit,
  analytics,
}: {
  children: ReactNode;
  profit: ReactNode;
  analytics: ReactNode;
}) => {
  const t = await getI18n();

  return (
    <Page>
      <Page.Header title={t('statistics.title')}>
        <StatisticsPageHeaderActions />
      </Page.Header>
      <div className="flex flex-col grow gap-8 lg:gap-4">
        {children}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 grow">
          {analytics}
          {profit}
        </div>
      </div>
    </Page>
  );
};

export default StatisticsLayout;
