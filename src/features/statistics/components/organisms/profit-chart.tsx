'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { formatDate } from '@/components/atoms/format-date';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Sale } from '@/features/sales/api/types/sales';

const chartConfig = {
  profit: {
    label: 'Profit',
  },
} satisfies ChartConfig;

interface Props {
  data: Sale[];
}

export function ProfitChart({ data }: Props) {
  const profitBasedOnSales =
    data?.reduce<
      Record<
        string,
        {
          profit: number;
        }
      >
    >((acc, sale) => {
      acc[formatDate(new Date(sale.soldDate), 'MMM d, yyyy')] = {
        ...acc[formatDate(new Date(sale.soldDate), 'MMM d, yyyy')],
        profit: (acc[formatDate(new Date(sale.soldDate), 'MMM d, yyyy')]?.profit || 0) + sale.profit,
      };

      return acc;
    }, {}) || [];

  const chartData = Object.entries(profitBasedOnSales).map(([date, profit]) => ({
    date,
    profit: profit?.profit || 0,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        className="h-full w-full"
        margin={{
          right: 12,
          left: 30,
          top: 20,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey="profit" type="natural" stroke="var(--color-primary)" strokeWidth={2} dot={true} />
      </LineChart>
    </ChartContainer>
  );
}
