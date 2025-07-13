'use client';

import { subDays } from 'date-fns';
import { parseAsIsoDate, useQueryStates } from 'nuqs';

import { Skeleton } from '@/components/ui/skeleton';
import { useSales } from '@/features/sales/hooks/query/use-sales';

import UnavailableData from '../atoms/unavailable-data';
import { ProfitChart } from '../organisms/profit-chart';

const Profit = () => {
  const [dateRange] = useQueryStates({
    from: parseAsIsoDate.withDefault(subDays(new Date(), 30)),
    to: parseAsIsoDate.withDefault(new Date()),
  });

  const { from, to } = dateRange;

  // TODO: FETCH ONE SALE HERE TO GET TOTAL AMOUNT OF SALES
  const { data: saleData } = useSales({
    limit: 1,
    offset: 0,
    filters: {
      dateRange: {
        from: from || new Date(),
        to: to || new Date(),
      },
    },
    enabled: !!from && !!to,
  });

  const { data: salesData, isLoading } = useSales({
    limit: saleData?.total || 10,
    offset: 0,
    filters: dateRange
      ? {
          dateRange: {
            from: from || new Date(),
            to: to || new Date(),
          },
        }
      : undefined,
    enabled: !!saleData,
  });

  return (
    <>
      {isLoading || !salesData ? (
        <div className="flex flex-col h-full w-full items-center gap-2 justify-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-full w-full" />
          ))}
        </div>
      ) : salesData?.resources?.length !== 0 ? (
        <ProfitChart data={salesData?.resources || []} />
      ) : (
        <UnavailableData message="No sales found" />
      )}
    </>
  );
};

export default Profit;
