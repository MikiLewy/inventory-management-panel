'use client';

import { useRevertSales } from '@/features/sales/hooks/mutation/use-revert-sales';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

interface Props extends DialogActions {
  selectedSalesIds: number[];
}

const RevertSalesDialog = ({ open, onClose, selectedSalesIds }: Props) => {
  const t = useI18n();

  const { mutate, isPending } = useRevertSales();

  const onSubmit = () => {
    mutate(selectedSalesIds, { onSuccess: onClose });
  };

  return (
    <Dialog
      title={t('sales.dialog.revertSales.title')}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={selectedSalesIds.length <= 0}
      confirmButtonText={t('sales.dialog.revertSales.confirmButton')}
      scrollable>
      <p>{t('sales.dialog.revertSales.description')}</p>
    </Dialog>
  );
};

export default RevertSalesDialog;
