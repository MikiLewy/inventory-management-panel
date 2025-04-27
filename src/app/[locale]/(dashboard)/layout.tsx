import { ReactNode } from 'react';

import DashboardTemplate from '@/components/templates/dashboard';

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return <DashboardTemplate>{children}</DashboardTemplate>;
};

export default DashboardLayout;
