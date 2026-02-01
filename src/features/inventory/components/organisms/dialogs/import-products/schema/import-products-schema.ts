import { z } from 'zod';

import { useI18n } from '@/locales/client';
import { ProductStatus } from '@/server/db/types/enum/product-status';
import { SizeUnit } from '@/types/enum/size-unit';

export const useImportProductRowSchema = () => {
  const t = useI18n();

  return z.object({
    name: z.string().min(1, t('importProducts.validation.nameRequired')),
    sku: z.string().min(1, t('importProducts.validation.skuRequired')),
    size: z.string().min(1, t('importProducts.validation.sizeRequired')),
    purchasePrice: z.coerce
      .number({
        required_error: t('importProducts.validation.priceRequired'),
        invalid_type_error: t('importProducts.validation.pricePositive'),
      })
      .min(0, t('importProducts.validation.pricePositive')),
    purchaseDate: z
      .string()
      .optional()
      .refine(
        val => {
          if (!val || val.trim() === '') return true;
          const date = new Date(val);

          return !isNaN(date.getTime());
        },
        { message: t('importProducts.validation.invalidDate') },
      )
      .transform(val => (val && val.trim() !== '' ? val : undefined)),
    status: z
      .string()
      .optional()
      .transform(val => {
        if (!val || val.trim() === '') return ProductStatus.IN_STOCK;
        const upperVal = val.toUpperCase().trim();
        if (upperVal === 'IN_STOCK' || upperVal === 'IN STOCK') return ProductStatus.IN_STOCK;
        if (upperVal === 'IN_DELIVERY' || upperVal === 'IN DELIVERY') return ProductStatus.IN_DELIVERY;
        return val as ProductStatus;
      })
      .refine(val => Object.values(ProductStatus).includes(val as ProductStatus), {
        message: t('importProducts.validation.invalidStatus'),
      }),
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
        message: t('importProducts.validation.invalidSizeUnit'),
      }),
    warehouse: z
      .string()
      .optional()
      .transform(val => (val && val.trim() !== '' ? val.trim() : undefined)),
  });
};

export type ImportProductRow = z.infer<ReturnType<typeof useImportProductRowSchema>>;
