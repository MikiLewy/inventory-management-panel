/* eslint-disable complexity */
'use client';

import { subDays } from 'date-fns';
import { DollarSignIcon, PiggyBank, TrendingUp, Truck } from 'lucide-react';
import { parseAsIsoDate, useQueryStates } from 'nuqs';

import { useProducts } from '@/features/inventory/hooks/query/use-products';
import { useSales } from '@/features/sales/hooks/query/use-sales';
import { useFormatPrice } from '@/hooks/use-format-price';
import { useI18n } from '@/locales/client';

import OverviewCard from '../atoms/overview-card';

const Overview = () => {
  const t = useI18n();

  const [dateRange] = useQueryStates({
    from: parseAsIsoDate.withDefault(subDays(new Date(), 30)),
    to: parseAsIsoDate.withDefault(new Date()),
  });

  const { from, to } = dateRange;

  const { formatPrice } = useFormatPrice();

  // TODO: FETCH ONE ITEM HERE TO GET TOTAL AMOUNT OF PRODUCTS
  const { data: productData } = useProducts({
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

  const { data: productsData, isLoading: isProductsLoading } = useProducts({
    limit: productData?.total || 10,
    offset: 0,
    filters: {
      dateRange: {
        from: from || new Date(),
        to: to || new Date(),
      },
    },
    enabled: !!productData,
  });

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

  const { data: salesData, isLoading: isSalesLoading } = useSales({
    limit: saleData?.total || 10,
    offset: 0,
    filters: {
      dateRange: {
        from: from || new Date(),
        to: to || new Date(),
      },
    },
    enabled: !!from && !!to,
  });

  const inventoryValue = productsData?.resources?.reduce((acc, product) => acc + product.purchasePrice, 0) || 0;

  const totalRevenue = salesData?.resources?.reduce((acc, sale) => acc + sale.soldPrice, 0) || 0;

  const hasProducts = !!productsData && productsData?.total > 0;
  const hasSales = !!salesData && salesData?.total > 0;

  const isLoadingSales = isSalesLoading || !hasSales;
  const isLoadingProducts = isProductsLoading || !hasProducts;

  const overviewCards: {
    key: string;
    title: string;
    icon: React.ReactNode;
    value: string | number;
    loading?: boolean;
    caption?: string;
  }[] = [
    {
      key: 'total-revenue',
      title: t('statistics.totalRevenue'),
      icon: <DollarSignIcon size={14} />,
      value: formatPrice(totalRevenue),
      loading: isLoadingSales,
    },
    {
      key: 'new-items',
      title: t('statistics.newItems'),
      icon: <Truck size={14} />,
      value: productsData?.total || 0,
      loading: isLoadingProducts,
    },
    {
      key: 'sales',
      title: t('statistics.sales'),
      icon: <TrendingUp size={14} />,
      value: salesData?.total || 0,
      loading: isLoadingSales,
    },
    {
      key: 'inventory-value',
      title: t('statistics.inventoryValue'),
      icon: <PiggyBank size={14} />,
      value: formatPrice(inventoryValue),
      loading: isLoadingProducts,
    },
  ];

  return overviewCards.map(card => <OverviewCard {...card} key={card.key} />);
};

export default Overview;
