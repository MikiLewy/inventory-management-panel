'use client';

import { useRemoveSales } from '@/features/sales/hooks/mutation/use-remove-sales';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

interface Props extends DialogActions {
  selectedSalesIds: number[];
  selectedProductName?: string;
}

const RemoveSalesDialog = ({ open, onClose, selectedSalesIds, selectedProductName }: Props) => {
  const t = useI18n();

  const isRemovingMultipleSales = selectedSalesIds.length > 1;

  const { mutate, isPending } = useRemoveSales();

  const onSubmit = () => {
    mutate(selectedSalesIds, { onSuccess: onClose });
  };

  return (
    <Dialog
      title={isRemovingMultipleSales ? t('sales.dialog.remove.titleMultiple') : t('sales.dialog.remove.title')}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={selectedSalesIds.length <= 0}
      confirmButtonText={t('sales.dialog.remove.confirmButton')}
      scrollable>
      <p>
        {isRemovingMultipleSales
          ? t('sales.dialog.remove.descriptionMultiple')
          : t('sales.dialog.remove.description', {
              productName: selectedProductName,
            })}
      </p>
    </Dialog>
  );
};

export default RemoveSalesDialog;
