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
import { useI18n } from '@/locales/client';

import { useCreateSaleFromInventorySchema } from './schema/create-sale-from-inventory-schema';

export interface CreateSaleFromInventoryFormValues {
  products: {
    id: number;
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

  const renderStep = () => {
    switch (value) {
      case CreateSaleStates.INVENTORY_PRODUCTS:
        return <div>Inventory products</div>;
      case CreateSaleStates.SALE_DETAILS:
        return <div>Sale details</div>;
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
    <SheetContent onOpenAutoFocus={e => e.preventDefault()} className="min-w-4xl flex flex-col">
      <SheetHeader>
        <SheetTitle>{t('createSale.title')}</SheetTitle>
        <SheetDescription>{t('createSale.description')}</SheetDescription>
      </SheetHeader>
      <div className="mx-4 flex flex-col grow">
        <Stepper steps={staticSteps} context={context} />
        <div className="flex flex-col mt-8 grow">
          <FormProvider {...form}>{renderStep()}</FormProvider>
        </div>
      </div>
    </SheetContent>
  );
}
