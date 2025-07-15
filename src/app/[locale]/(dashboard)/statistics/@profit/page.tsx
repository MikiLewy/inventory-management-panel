import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prefetchSales } from '@/features/sales/api/lib/sales.prefetch';
import Profit from '@/features/statistics/components/templates/profit';
import { getI18n } from '@/locales/server';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const StatisticsProfitPage = async () => {
  const t = await getI18n();

  return (
    <Card className="col-span-4 flex flex-col grow">
      <CardHeader>
        <CardTitle>{t('statistics.profit')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow">
        <HydrationBoundaryProvider prefetchDataFunctions={[prefetchSales]}>
          <Profit />
        </HydrationBoundaryProvider>
      </CardContent>
    </Card>
  );
};

export default StatisticsProfitPage;
