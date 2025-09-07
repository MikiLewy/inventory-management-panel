'use client';

import { useEffect } from 'react';

import OnboardingDialog from '@/components/organisms/dialogs/onboarding-dialog/onboarding-dialog';
import { useWarehouses } from '@/features/warehouse/hooks/query/use-warehouses';
import { useDialog } from '@/hooks/use-dialog';

const ClientDashboard = () => {
  const [isOpenOnboardingDialog, handleOpenOnboardingDialog, handleCloseOnboardingDialog] = useDialog();

  const { data: warehouseData } = useWarehouses();

  const hasNoWarehouses = warehouseData && warehouseData?.length === 0;

  useEffect(() => {
    if (hasNoWarehouses) {
      handleOpenOnboardingDialog();
    }
  }, [hasNoWarehouses, handleOpenOnboardingDialog]);

  return <OnboardingDialog open={isOpenOnboardingDialog} onClose={handleCloseOnboardingDialog} />;
};

export default ClientDashboard;
