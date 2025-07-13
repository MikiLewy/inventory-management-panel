'use client';

import { subDays } from 'date-fns';
import { parseAsIsoDate, useQueryStates } from 'nuqs';

import { DateRangePicker } from '@/components/molecules/date-range-picker';

const StatisticsPageHeaderActions = () => {
  const [dateRange, setDateRange] = useQueryStates({
    from: parseAsIsoDate.withDefault(subDays(new Date(), 30)),
    to: parseAsIsoDate.withDefault(new Date()),
  });

  return (
    <div>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
    </div>
  );
};

export default StatisticsPageHeaderActions;
