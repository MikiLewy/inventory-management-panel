'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Stepper from '@/components/organisms/stepper';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  createSaleMachine,
  CreateSaleStates,
  CreateSaleStepperTitle,
} from '@/features/sales/utils/create-sale-machine';
import { useSelection } from '@/hooks/use-selection';
import { useI18n } from '@/locales/client';
import { SizeUnit } from '@/types/enum/size-unit';

import SaleDetails from '../../molecules/create-sale-from-inventory/sale-details';
import SelectFromInventory from '../../molecules/create-sale-from-inventory/select-from-inventory';

import { useCreateSaleFromInventorySchema } from './schema/create-sale-from-inventory-schema';

export interface CreateSaleFromInventoryFormValues {
  products: {
    id: number;
    name: string;
    size: string;
    sizeUnit: SizeUnit;
    soldPrice: number;
    soldPlace: string | undefined;
    soldDate: Date | undefined;
  }[];
}

const defaultValues: CreateSaleFromInventoryFormValues = {
  products: [],
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateSaleFromInventorySheet({ open, onClose }: Props) {
  const t = useI18n();

  const validationSchema = useCreateSaleFromInventorySchema();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const staticSteps = [
    {
      key: 'inventory-products',
      step: '1',
    },
    {
      key: 'sale-details',
      step: '2',
    },
  ];

  const [current, send] = useMachine(createSaleMachine, {
    input: {
      step: '1',
      content: CreateSaleStepperTitle.INVENTORY_PRODUCTS,
    },
  });

  const { value, context } = current;

  const { selectedRows, setSelectedRows } = useSelection();

  const renderStep = () => {
    switch (value) {
      case CreateSaleStates.INVENTORY_PRODUCTS:
        return <SelectFromInventory send={send} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />;
      case CreateSaleStates.SALE_DETAILS:
        return <SaleDetails send={send} onClose={onClose} setSelectedRows={setSelectedRows} />;
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues, {
        keepDirty: false,
        keepErrors: false,
        keepIsValid: false,
        keepTouched: false,
      });
      send({ type: 'RESET' });
    }
  }, [open]);

  return (
    <SheetContent onOpenAutoFocus={e => e.preventDefault()} className="min-w-4xl  flex flex-col">
      <SheetHeader>
        <SheetTitle>{t('createSale.title')}</SheetTitle>
        <SheetDescription>{t('createSale.description')}</SheetDescription>
      </SheetHeader>
      <div className="px-4 flex flex-col grow overflow-auto">
        <Stepper steps={staticSteps} context={context} />
        <div className="flex flex-col mt-8 grow">
          <FormProvider {...form}>{renderStep()}</FormProvider>
        </div>
      </div>
    </SheetContent>
  );
}
