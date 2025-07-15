'use client';

import { parseAsIsoDateTime, useQueryStates } from 'nuqs';

import { DateRangePicker } from '@/components/molecules/date-range-picker';

const StatisticsPageHeaderActions = () => {
  const [dateRange, setDateRange] = useQueryStates({
    from: parseAsIsoDateTime,
    to: parseAsIsoDateTime,
  });

  return <DateRangePicker value={dateRange} onChange={setDateRange} />;
};

export default StatisticsPageHeaderActions;
