import { Store, Warehouse } from 'lucide-react';

import { Route } from '@/types/interfaces/route';

import { RouteTitle } from '@/types/enum/route-title';

export const routes: Route[] = [
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
