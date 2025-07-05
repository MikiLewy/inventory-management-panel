'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Stepper from '@/components/organisms/stepper';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import {
  createProductMachine,
  CreateProductStepperTitle,
  CreateProductStates,
} from '@/features/inventory/utils/create-product-machine';
import { useI18n } from '@/locales/client';
import { SizeUnit } from '@/types/enum/size-unit';

import ProductDetails from '../../molecules/create-product/product-details';
import SizeAndPrice from '../../molecules/create-product/size-and-price';

import { useCreateProductSchema } from './schema/create-product-schema';

export interface CreateProductFormValues {
  name: string;
  sku: string;
  status: ProductStatus;
  euSizingType: 'standard' | 'adidas';
  categoryId: number | undefined;
  sizeUnit: SizeUnit;
  brand: string | undefined;
  imageUrl: string | undefined;
  products: {
    size: string;
    quantity: number;
    purchasePrice: number;
    purchasePlace: string | undefined;
    purchaseDate: Date | undefined;
  }[];
}

const defaultValues: CreateProductFormValues = {
  name: '',
  sku: '',
  status: ProductStatus.IN_STOCK,
  categoryId: undefined,
  euSizingType: 'standard',
  sizeUnit: SizeUnit.EU,
  brand: '',
  products: [],
  imageUrl: undefined,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateProductSheet({ open, onClose }: Props) {
  const t = useI18n();

  const validationSchema = useCreateProductSchema();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const staticSteps = [
    {
      key: 'product-details',
      step: '1',
    },
    {
      key: 'size-and-price',
      step: '2',
    },
  ];

  const [current, send] = useMachine(createProductMachine, {
    input: {
      step: '1',
      content: CreateProductStepperTitle.PRODUCT_DETAILS,
    },
  });

  const { value, context } = current;

  const renderStep = () => {
    switch (value) {
      case CreateProductStates.PRODUCT_DETAILS:
        return <ProductDetails send={send} />;
      case CreateProductStates.SIZE_AND_PRICE:
        return <SizeAndPrice send={send} onClose={onClose} />;
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
        <SheetTitle>{t('createProduct.title')}</SheetTitle>
        <SheetDescription>{t('createProduct.description')}</SheetDescription>
      </SheetHeader>
      <div className="mx-4 flex flex-col grow">
        <Stepper steps={staticSteps} context={context} />
        <div className="mt-8  flex flex-col grow">
          <FormProvider {...form}>{renderStep()}</FormProvider>
        </div>
      </div>
    </SheetContent>
  );
}
