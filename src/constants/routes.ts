import { ChartPie, Store, Warehouse } from 'lucide-react';

import { RouteTitle } from '@/types/enum/route-title';
import { Route } from '@/types/interfaces/route';

export const routes: Route[] = [
  {
    title: RouteTitle.STATISTICS,
    href: '/statistics',
    icon: ChartPie,
  },
  {
    title: RouteTitle.INVENTORY,
    href: '/inventory',
    icon: Warehouse,
  },
  {
    title: RouteTitle.SALES,
    href: '/sales',
    icon: Store,
  },
];
