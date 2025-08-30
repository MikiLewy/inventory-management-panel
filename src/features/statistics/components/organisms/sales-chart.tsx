'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { formatDate } from '@/components/atoms/format-date';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Sale } from '@/features/sales/api/types/sales';
import { useCurrentLocale } from '@/locales/client';

const chartConfig = {
  totalPrice: {
    label: 'Total sales',
  },
} satisfies ChartConfig;

interface Props {
  data: Sale[];
}

export function SalesChart({ data }: Props) {
  const locale = useCurrentLocale();

  const sortedData =
    data?.sort((a, b) => new Date(a.soldDate || new Date()).getTime() - new Date(b.soldDate || new Date()).getTime()) ||
    [];

  const salesTotalsByDate = sortedData.reduce<
    Record<
      string,
      {
        totalPrice: number;
      }
    >
  >((acc, sale) => {
    const formattedDate = formatDate(new Date(sale.soldDate || new Date()), 'MMM d, yyyy', locale);

    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        totalPrice: 0,
      };
    }

    acc[formattedDate].totalPrice += sale.soldPrice;
    return acc;
  }, {});

  const chartData = Object.entries(salesTotalsByDate).map(([date, salesTotals]) => ({
    date,
    totalPrice: salesTotals.totalPrice,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="totalPrice" fill="var(--color-primary)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
