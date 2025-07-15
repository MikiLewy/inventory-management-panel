import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prefetchSales } from '@/features/sales/api/lib/sales.prefetch';
import Analytics from '@/features/statistics/components/templates/analytics';
import { getI18n } from '@/locales/server';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const StatisticsOverviewPage = async () => {
  const t = await getI18n();

  return (
    <Card className="col-span-4 flex flex-col grow">
      <CardHeader>
        <CardTitle>{t('statistics.overview')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow">
        <HydrationBoundaryProvider prefetchDataFunctions={[prefetchSales]}>
          <Analytics />
        </HydrationBoundaryProvider>
      </CardContent>
    </Card>
  );
};

export default StatisticsOverviewPage;
