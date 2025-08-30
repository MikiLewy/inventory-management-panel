import { ReactNode } from 'react';

import Navbar from '@/components/organisms/navbar';

import { Sidebar } from '../organisms/sidebar';
import { SidebarProvider } from '../ui/sidebar';
import { SidebarInset } from '../ui/sidebar';

interface Props {
  children: ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return (
    <SidebarProvider className="flex w-full h-full">
      <Sidebar variant="inset" />
      <SidebarInset>
        <Navbar />
        <div className="w-full overflow-x-auto h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
