import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prefetchSales } from '@/features/sales/api/lib/sales.prefetch';
import Analytics from '@/features/statistics/components/templates/analytics';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const StatisticsOverviewPage = () => {
  return (
    <Card className="col-span-4 flex flex-col grow">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
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
