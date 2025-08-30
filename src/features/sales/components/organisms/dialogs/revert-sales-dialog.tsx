'use client';

import { useRevertSales } from '@/features/sales/hooks/mutation/use-revert-sales';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

interface Props extends DialogActions {
  selectedSalesIds: number[];
  selectedProductName?: string;
}

const RevertSalesDialog = ({ open, onClose, selectedSalesIds, selectedProductName }: Props) => {
  const t = useI18n();

  const isRevertingMultipleSales = selectedSalesIds.length > 1;

  const { mutate, isPending } = useRevertSales();

  const onSubmit = () => {
    mutate(selectedSalesIds, { onSuccess: onClose });
  };

  return (
    <Dialog
      title={
        isRevertingMultipleSales ? t('sales.dialog.revertSales.titleMultiple') : t('sales.dialog.revertSales.title')
      }
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={selectedSalesIds.length <= 0}
      confirmButtonText={t('sales.dialog.revertSales.confirmButton')}
      scrollable>
      <p>
        {isRevertingMultipleSales
          ? t('sales.dialog.revertSales.descriptionMultiple')
          : t('sales.dialog.revertSales.description', {
              productName: selectedProductName,
            })}
      </p>
    </Dialog>
  );
};

export default RevertSalesDialog;
