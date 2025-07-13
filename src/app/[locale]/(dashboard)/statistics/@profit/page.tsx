import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prefetchSales } from '@/features/sales/api/lib/sales.prefetch';
import Profit from '@/features/statistics/components/templates/profit';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const StatisticsProfitPage = () => {
  return (
    <Card className="col-span-4 flex flex-col grow">
      <CardHeader>
        <CardTitle>Profit</CardTitle>
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
