'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useWarehouse } from '@/features/warehouse/hooks/query/use-warehouse';
import { useI18n } from '@/locales/client';

import CreateWarehouseForm from '../../molecules/create-warehouse-form';

import { useCreateWarehouseSchema } from './schema/create-warehouse-schema';

export interface CreateWarehouseFormValues {
  name: string;
  address: string;
  postCode: string;
  city: string;
  country: string;
}

const defaultValues: CreateWarehouseFormValues = {
  name: '',
  address: '',
  postCode: '',
  city: '',
  country: '',
};

interface Props {
  open: boolean;
  onClose: () => void;
  selectedWarehouseId?: number;
}

export function CreateWarehouseSheet({ open, onClose, selectedWarehouseId }: Props) {
  const t = useI18n();

  const { data: warehouseData } = useWarehouse({
    id: selectedWarehouseId || 0,
    enabled: !!selectedWarehouseId && open,
  });

  const validationSchema = useCreateWarehouseSchema();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    values: {
      name: warehouseData?.name || '',
      address: warehouseData?.address || '',
      postCode: warehouseData?.postCode || '',
      city: warehouseData?.city || '',
      country: warehouseData?.country || '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues, {
        keepDirty: false,
        keepErrors: false,
        keepIsValid: false,
        keepTouched: false,
      });
    }
  }, [open]);

  return (
    <SheetContent onOpenAutoFocus={e => e.preventDefault()} className="min-w-4xl flex flex-col">
      <SheetHeader>
        <SheetTitle>
          {selectedWarehouseId ? t('warehouse.dialog.edit.title') : t('warehouse.dialog.add.title')}
        </SheetTitle>
        <SheetDescription>
          {selectedWarehouseId ? t('warehouse.dialog.edit.description') : t('warehouse.dialog.add.description')}
        </SheetDescription>
      </SheetHeader>
      <div className="mx-4 flex flex-col grow">
        <div className="flex flex-col grow">
          <FormProvider {...form}>
            <CreateWarehouseForm onClose={onClose} selectedWarehouseId={selectedWarehouseId} />
          </FormProvider>
        </div>
      </div>
    </SheetContent>
  );
}
