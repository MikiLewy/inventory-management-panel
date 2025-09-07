'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRemoveWarehouse } from '@/features/warehouse/hooks/mutation/use-remove-warehouse';
import { useWarehouseHasProducts } from '@/features/warehouse/hooks/query/use-warehouse-has-products';
import { useWarehouses } from '@/features/warehouse/hooks/query/use-warehouses';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

import { useRemoveWarehouseSchema } from './schema/remove-warehouse-schema';

interface Props extends DialogActions {
  selectedWarehouseId: number;
  selectedWarehouseName?: string;
}

const defaultValues = {
  warehouseId: undefined,
};

const RemoveWarehouseDialog = ({ open, onClose, selectedWarehouseId, selectedWarehouseName }: Props) => {
  const t = useI18n();

  const { mutate, isPending } = useRemoveWarehouse();

  const { data: warehousesData } = useWarehouses(open);

  const { data: hasProducts } = useWarehouseHasProducts({ id: selectedWarehouseId, enabled: !!selectedWarehouseId });

  const remainingWarehouses = warehousesData?.filter(warehouse => warehouse.id !== selectedWarehouseId);

  const hasAtLeastOneRemainingWarehouse = remainingWarehouses?.length && remainingWarehouses?.length > 0;

  const isRequired = hasProducts && hasAtLeastOneRemainingWarehouse;

  const validationSchema = useRemoveWarehouseSchema(isRequired || false);

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    values:
      hasAtLeastOneRemainingWarehouse && hasProducts ? { warehouseId: remainingWarehouses?.[0]?.id } : defaultValues,
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    mutate({ warehouseId: selectedWarehouseId, warehouseIdToMoveProducts: values.warehouseId }, { onSuccess: onClose });
  };

  const isDisabled =
    !selectedWarehouseId ||
    (hasProducts && hasAtLeastOneRemainingWarehouse && !!errors.warehouseId && !form.getValues('warehouseId')) ||
    (!form.getValues('warehouseId') && !hasAtLeastOneRemainingWarehouse);

  return (
    <Dialog
      title={t('warehouse.dialog.remove.title')}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={isDisabled}
      confirmButtonText={t('warehouse.dialog.remove.confirmButton')}
      scrollable>
      <p>
        {t('warehouse.dialog.remove.description', {
          warehouseName: selectedWarehouseName,
        })}
      </p>
      {hasProducts && hasAtLeastOneRemainingWarehouse ? (
        <div className="mt-4">
          <p>{t('warehouse.dialog.remove.selectWarehouse')}</p>
          <FormProvider {...form}>
            <FormField
              name="warehouseId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-2 mt-4 w-full">
                  <FormLabel>{t('warehouse.dialog.remove.warehouse')}</FormLabel>
                  <Select
                    value={value?.toString() || ''}
                    defaultValue={value?.toString() || ''}
                    onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('warehouse.dialog.remove.warehousePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      {remainingWarehouses?.map(warehouse => (
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

export default RemoveWarehouseDialog;
