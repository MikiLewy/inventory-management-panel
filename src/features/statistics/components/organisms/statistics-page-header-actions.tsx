'use client';

import { subDays } from 'date-fns';
import { parseAsIsoDateTime, useQueryStates } from 'nuqs';

import { DateRangePicker } from '@/components/molecules/date-range-picker';

const StatisticsPageHeaderActions = () => {
  const [dateRange, setDateRange] = useQueryStates({
    from: parseAsIsoDateTime.withDefault(subDays(new Date(), 30)),
    to: parseAsIsoDateTime.withDefault(new Date()),
  });

  return <DateRangePicker value={dateRange} onChange={setDateRange} />;
};

export default StatisticsPageHeaderActions;
