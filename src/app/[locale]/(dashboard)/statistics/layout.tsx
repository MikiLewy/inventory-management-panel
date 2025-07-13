import { Metadata } from 'next';
import { ReactNode } from 'react';

import Page from '@/components/organisms/page/page';
import StatisticsPageHeaderActions from '@/features/statistics/components/organisms/statistics-page-header-actions';

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
  return (
    <Page>
      <Page.Header title="Statistics">
        <StatisticsPageHeaderActions />
      </Page.Header>
      <div className="flex flex-col grow gap-4">
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
