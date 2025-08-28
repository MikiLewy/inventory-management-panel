'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { formatDate } from '@/components/atoms/format-date';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Sale } from '@/features/sales/api/types/sales';
import { useCurrentLocale } from '@/locales/client';

const chartConfig = {
  profit: {
    label: 'Profit',
  },
} satisfies ChartConfig;

interface Props {
  data: Sale[];
}

export function ProfitChart({ data }: Props) {
  const locale = useCurrentLocale();

  const sortedData =
    data?.sort((a, b) => new Date(a.soldDate || new Date()).getTime() - new Date(b.soldDate || new Date()).getTime()) ||
    [];

  const profitByDate = sortedData.reduce<Record<string, { profit: number }>>((acc, sale) => {
    const formattedDate = formatDate(new Date(sale.soldDate || new Date()), 'MMM d, yyyy', locale);

    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        profit: 0,
      };
    }

    acc[formattedDate].profit += sale.profit;
    return acc;
  }, {});

  const chartData = Object.entries(profitByDate).map(([date, { profit }]) => ({
    date,
    profit,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        className="h-full w-full"
        margin={{
          right: 12,
          left: 40,
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
