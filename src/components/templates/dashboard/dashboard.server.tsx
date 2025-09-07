import { ReactNode } from 'react';

import Navbar from '@/components/organisms/navbar';
import { prefetchWarehouses } from '@/features/warehouse/api/lib/warehouse.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

import { Sidebar } from '../../organisms/sidebar';
import { SidebarProvider } from '../../ui/sidebar';
import { SidebarInset } from '../../ui/sidebar';

import ClientDashboard from './dashboard.client';

interface Props {
  children: ReactNode;
}

const ServerDashboard = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider className="flex w-full h-full">
        <Sidebar variant="inset" />
        <SidebarInset>
          <Navbar />
          <div className="w-full overflow-x-auto h-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <HydrationBoundaryProvider prefetchDataFunctions={[prefetchWarehouses]}>
        <ClientDashboard />
      </HydrationBoundaryProvider>
    </>
  );
};

export default ServerDashboard;
