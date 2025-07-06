'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useI18n } from '@/locales/client';

import CreateNewSale from '../../molecules/create-new-sale/create-new-sale';

import { useCreateNewSaleSchema } from './schema/create-new-sale-schema';

export interface CreateSaleFormValues {
  name: string;
  sku: string;
  brand: string | undefined;
  categoryId: number | undefined;
  purchasePrice: number;
  purchasePlace: string | undefined;
  purchaseDate: Date | undefined;
  size: string;
  imageUrl: string | undefined;
  soldPrice: number;
  soldPlace: string | undefined;
  soldDate: Date | undefined;
}

const defaultValues: CreateSaleFormValues = {
  name: '',
  sku: '',
  brand: undefined,
  categoryId: undefined,
  size: '',
  imageUrl: undefined,
  purchasePrice: 0,
  purchasePlace: undefined,
  purchaseDate: undefined,
  soldPrice: 0,
  soldPlace: undefined,
  soldDate: undefined,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateNewSaleSheet({ open, onClose }: Props) {
  const t = useI18n();

  const validationSchema = useCreateNewSaleSchema();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
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
        <SheetTitle>{t('createSale.title')}</SheetTitle>
        <SheetDescription>{t('createSale.description')}</SheetDescription>
      </SheetHeader>
      <div className="mx-4 flex flex-col grow">
        <div className="flex flex-col grow">
          <FormProvider {...form}>
            <CreateNewSale onClose={onClose} />
          </FormProvider>
        </div>
      </div>
    </SheetContent>
  );
}
