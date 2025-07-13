import { prefetchProducts } from '@/features/inventory/api/lib/products.prefetch';
import { prefetchSales } from '@/features/sales/api/lib/sales.prefetch';
import { Overview } from '@/features/statistics/index.server';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

export default function StatisticsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <HydrationBoundaryProvider prefetchDataFunctions={[prefetchProducts, prefetchSales]}>
        <Overview />
      </HydrationBoundaryProvider>
    </div>
  );
}
