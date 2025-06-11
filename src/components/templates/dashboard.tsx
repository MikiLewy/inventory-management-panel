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
    <SidebarProvider className="w-full">
      <Sidebar variant="inset" />
      <SidebarInset>
        <Navbar />
        <div className="">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
