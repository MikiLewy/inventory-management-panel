import { z } from 'zod';

import { useI18n } from '@/locales/client';
import { SizeUnit } from '@/types/enum/size-unit';

export const useImportSaleRowSchema = () => {
  const t = useI18n();

  return z.object({
    name: z.string().min(1, t('importSales.validation.nameRequired')),
    sku: z.string().min(1, t('importSales.validation.skuRequired')),
    size: z.string().min(1, t('importSales.validation.sizeRequired')),
    purchasePrice: z.coerce
      .number({
        required_error: t('importSales.validation.purchasePriceRequired'),
        invalid_type_error: t('importSales.validation.pricePositive'),
      })
      .min(0, t('importSales.validation.pricePositive')),
    soldPrice: z.coerce
      .number({
        required_error: t('importSales.validation.soldPriceRequired'),
        invalid_type_error: t('importSales.validation.pricePositive'),
      })
      .min(0, t('importSales.validation.pricePositive')),
    purchaseDate: z
      .string()
      .optional()
      .refine(
        val => {
          if (!val || val.trim() === '') return true;
          const date = new Date(val);

          return !isNaN(date.getTime());
        },
        { message: t('importSales.validation.invalidDate') },
      )
      .transform(val => (val && val.trim() !== '' ? val : undefined)),
    soldDate: z
      .string()
      .optional()
      .refine(
        val => {
          if (!val || val.trim() === '') return true;
          const date = new Date(val);

          return !isNaN(date.getTime());
        },
        { message: t('importSales.validation.invalidDate') },
      )
      .transform(val => (val && val.trim() !== '' ? val : undefined)),
    soldPlace: z
      .string()
      .optional()
      .transform(val => (val && val.trim() !== '' ? val.trim() : undefined)),
    brand: z
      .string()
      .optional()
      .transform(val => (val && val.trim() !== '' ? val.trim() : undefined)),
    category: z
      .string()
      .optional()
      .transform(val => (val && val.trim() !== '' ? val.trim() : undefined)),
    purchasePlace: z
      .string()
      .optional()
      .transform(val => (val && val.trim() !== '' ? val.trim() : undefined)),
    sizeUnit: z
      .string()
      .optional()
      .transform(val => {
        if (!val || val.trim() === '') return SizeUnit.EU;
        const upperVal = val.toUpperCase().trim();
        if (Object.values(SizeUnit).includes(upperVal as SizeUnit)) {
          return upperVal as SizeUnit;
        }
        return val as SizeUnit;
      })
      .refine(val => Object.values(SizeUnit).includes(val as SizeUnit), {
        message: t('importSales.validation.invalidSizeUnit'),
      }),
  });
};

export type ImportSaleRow = z.infer<ReturnType<typeof useImportSaleRowSchema>>;
