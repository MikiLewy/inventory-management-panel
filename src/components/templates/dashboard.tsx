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
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
