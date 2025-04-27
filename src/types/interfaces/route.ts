import { LucideIcon } from 'lucide-react';

import { RouteTitle } from '../enum/route-title';

export interface Route {
  title: RouteTitle;
  href: string;
  icon: LucideIcon;
}
