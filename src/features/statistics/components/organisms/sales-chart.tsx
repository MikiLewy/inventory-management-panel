'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { formatDate } from '@/components/atoms/format-date';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Sale } from '@/features/sales/api/types/sales';

const chartConfig = {
  totalPrice: {
    label: 'Total sales',
  },
} satisfies ChartConfig;

interface Props {
  data: Sale[];
}

export function SalesChart({ data }: Props) {
  const salesTotalsByDate =
    data?.reduce<
      Record<
        string,
        {
          totalPrice: number;
        }
      >
    >((acc, sale) => {
      acc[formatDate(new Date(sale.soldDate), 'MMM d, yyyy')] = {
        ...acc[formatDate(new Date(sale.soldDate), 'MMM d, yyyy')],
        totalPrice: (acc[formatDate(new Date(sale.soldDate), 'MMM d, yyyy')]?.totalPrice || 0) + sale.soldPrice,
      };

      return acc;
    }, {}) || [];

  const chartData = Object.entries(salesTotalsByDate).map(([date, salesTotals]) => ({
    date,
    totalPrice: salesTotals?.totalPrice || 0,
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
