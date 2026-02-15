'use client';

import { useCallback } from 'react';

import { DialogActions } from '@/components/organisms/dialog';
import { ImportDialog } from '@/components/organisms/dialogs/import-dialog';
import { useI18n } from '@/locales/client';
import { ImportResult, ParsedRow } from '@/shared/types/import-export';

import { useImportSales } from '../../../../hooks/mutation/use-import-sales';
import { ImportSalePayload } from '../../../../types/payload/import-sales';

import { useImportSaleRowSchema } from './schema/import-sales-schema';

const COLUMN_MAPPINGS: Record<string, string> = {
  name: 'name',
  sku: 'sku',
  size: 'size',
  purchaseprice: 'purchasePrice',
  purchasePrice: 'purchasePrice',
  soldprice: 'soldPrice',
  soldPrice: 'soldPrice',
  purchasedate: 'purchaseDate',
  purchaseDate: 'purchaseDate',
  solddate: 'soldDate',
  soldDate: 'soldDate',
  soldplace: 'soldPlace',
  soldPlace: 'soldPlace',
  brand: 'brand',
  category: 'category',
  purchaseplace: 'purchasePlace',
  purchasePlace: 'purchasePlace',
  sizeunit: 'sizeUnit',
  sizeUnit: 'sizeUnit',
  unit: 'sizeUnit',
};

const REQUIRED_COLUMNS = ['name', 'sku', 'size', 'purchasePrice', 'soldPrice'];

const ImportSalesDialog = ({ open, onClose }: DialogActions) => {
  const t = useI18n();
  const schema = useImportSaleRowSchema();
  const { mutate: importSales, isPending } = useImportSales();

  const validateRows = useCallback(
    (rows: ParsedRow[]): { validRows: ImportSalePayload[]; errors: { row: number; message: string }[] } => {
      const validRows: ImportSalePayload[] = [];
      const errors: { row: number; message: string }[] = [];

      rows.forEach((row, index) => {
        const rowNumber = index + 2; // +2 for 1-indexed + header row

        try {
          const parsed = schema.parse(row);
          validRows.push(parsed as ImportSalePayload);
        } catch (error) {
          if (error instanceof Error) {
            // Extract Zod error messages
            const zodError = error as { errors?: { message: string; path: string[] }[] };
            if (zodError.errors && zodError.errors.length > 0) {
              const messages = zodError.errors.map(e => {
                const field = e.path.join('.');

                return field ? `${field}: ${e.message}` : e.message;
              });
              errors.push({ row: rowNumber, message: messages.join('; ') });
            } else {
              errors.push({ row: rowNumber, message: error.message });
            }
          } else {
            errors.push({ row: rowNumber, message: 'Unknown validation error' });
          }
        }
      });

      return { validRows, errors };
    },
    [schema],
  );

  const handleImport = useCallback(
    (
      rows: ParsedRow[],
      { onSuccess, onError }: { onSuccess: (result: ImportResult) => void; onError: () => void },
    ) => {
      const { validRows, errors } = validateRows(rows);

      if (validRows.length === 0) {
        onSuccess({ success: 0, failed: errors.length, errors });
        return;
      }

      importSales(validRows, {
        onSuccess: result => {
          // Merge validation errors with server errors
          const mergedResult: ImportResult = {
            success: result.success,
            failed: result.failed + errors.length,
            errors: [...errors, ...result.errors],
          };
          onSuccess(mergedResult);
        },
        onError,
      });
    },
    [validateRows, importSales],
  );

  return (
    <ImportDialog
      open={open}
      onClose={onClose}
      title={t('importSales.title')}
      description={t('importSales.description')}
      columnMappings={COLUMN_MAPPINGS}
      requiredColumns={REQUIRED_COLUMNS}
      csvTemplateUrl="/templates/sales-import-template.csv"
      xlsxTemplateUrl="/templates/sales-import-template.xlsx"
      importButtonText={t('importSales.import')}
      onImport={handleImport}
      isPending={isPending}
    />
  );
};

export default ImportSalesDialog;
