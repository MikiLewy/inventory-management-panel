'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { useRevertSales } from '@/features/sales/hooks/mutation/use-revert-sales';
import { useWarehouses } from '@/features/warehouse/hooks/query/use-warehouses';
import { useI18n } from '@/locales/client';

import { useRevertSalesSchema } from './schema/revert-sales-schema';

interface Props extends DialogActions {
  selectedSalesIds: number[];
  selectedProductName?: string;
}

export interface FormValues {
  warehouseId: number;
}

const defaultValues: FormValues = {
  warehouseId: 0,
};

const RevertSalesDialog = ({ open, onClose, selectedSalesIds, selectedProductName }: Props) => {
  const t = useI18n();

  const { data: warehousesData } = useWarehouses(open);

  const validationSchema = useRevertSalesSchema();

  const hasMoreThanOneWarehouse = warehousesData?.length && warehousesData?.length > 1;

  const isRevertingMultipleSales = selectedSalesIds.length > 1;

  const { mutate, isPending } = useRevertSales();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    values: warehousesData?.[0]?.id ? { warehouseId: warehousesData?.[0]?.id } : defaultValues,
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: FormValues) => {
    const warehouseId = hasMoreThanOneWarehouse ? values.warehouseId : warehousesData?.[0]?.id || 0;

    mutate({ salesIds: selectedSalesIds, warehouseId }, { onSuccess: onClose });
  };

  const isDisabled =
    selectedSalesIds.length <= 0 ||
    (hasMoreThanOneWarehouse && !!errors.warehouseId && !form.getValues('warehouseId')) ||
    (!form.getValues('warehouseId') && !warehousesData);

  return (
    <Dialog
      title={
        isRevertingMultipleSales ? t('sales.dialog.revertSales.titleMultiple') : t('sales.dialog.revertSales.title')
      }
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={isDisabled}
      confirmButtonText={t('sales.dialog.revertSales.confirmButton')}
      scrollable>
      <p>
        {isRevertingMultipleSales
          ? t('sales.dialog.revertSales.descriptionMultiple')
          : t('sales.dialog.revertSales.description', {
              productName: selectedProductName,
            })}
      </p>
      {hasMoreThanOneWarehouse ? (
        <div className="mt-4">
          <p>{t('sales.dialog.revertSales.selectWarehouse')}</p>
          <FormProvider {...form}>
            <FormField
              name="warehouseId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-2 mt-4 w-full">
                  <FormLabel>{t('createProduct.steps.productDetails.warehouse')} *</FormLabel>
                  <Select
                    value={value?.toString() || ''}
                    defaultValue={value?.toString() || ''}
                    onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('createProduct.steps.productDetails.warehousePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      {warehousesData?.map(warehouse => (
                        <SelectItem key={warehouse.id} value={warehouse.id?.toString()}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
          </FormProvider>
        </div>
      ) : null}
    </Dialog>
  );
};

export default RevertSalesDialog;
