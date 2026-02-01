'use client';

import { Download } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/locales/client';

import { useImportProducts } from '../../../../hooks/mutation/use-import-products';
import { ImportError, ImportProductPayload } from '../../../../types/payload/import-products';

import { FileDropzone } from './components/file-dropzone';
import { ImportErrorsTable } from './components/import-errors-table';
import { useImportProductRowSchema } from './schema/import-products-schema';
import { MAX_ROWS, ParsedRow, parseImportFile } from './utils/parse-import-file';

type DialogState = 'idle' | 'parsing' | 'validated' | 'importing';

interface ValidationResult {
  validProducts: ImportProductPayload[];
  errors: ImportError[];
}

const ImportProductsDialog = ({ open, onClose }: DialogActions) => {
  const t = useI18n();
  const schema = useImportProductRowSchema();
  const { mutate: importProducts, isPending } = useImportProducts();

  const [dialogState, setDialogState] = useState<DialogState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [parseErrors, setParseErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      setDialogState('idle');
      setSelectedFile(null);
      setValidationResult(null);
      setParseErrors([]);
    }
  }, [open]);

  const validateRows = useCallback(
    (rows: ParsedRow[]): ValidationResult => {
      const validProducts: ImportProductPayload[] = [];
      const errors: ImportError[] = [];

      rows.forEach((row, index) => {
        const rowNumber = index + 2; // +2 for 1-indexed + header row

        try {
          const parsed = schema.parse(row);
          validProducts.push(parsed as ImportProductPayload);
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

      return { validProducts, errors };
    },
    [schema],
  );

  const handleFileSelect = useCallback(
    async (file: File) => {
      setSelectedFile(file);
      setDialogState('parsing');
      setParseErrors([]);
      setValidationResult(null);

      try {
        const result = await parseImportFile(file);

        if (result.errors.length > 0) {
          setParseErrors(result.errors);
          setDialogState('idle');
          return;
        }

        if (result.data.length === 0) {
          setParseErrors([t('importProducts.validation.emptyFile')]);
          setDialogState('idle');
          return;
        }

        if (result.data.length > MAX_ROWS) {
          setParseErrors([t('importProducts.validation.tooManyRows')]);
          setDialogState('idle');
          return;
        }

        // Validate each row
        const validation = validateRows(result.data);
        setValidationResult(validation);
        setDialogState('validated');
      } catch (error) {
        setParseErrors([error instanceof Error ? error.message : 'Failed to parse file']);
        setDialogState('idle');
      }
    },
    [t, validateRows],
  );

  const handleImport = useCallback(() => {
    if (!validationResult || validationResult.validProducts.length === 0) return;

    setDialogState('importing');

    importProducts(validationResult.validProducts, {
      onSuccess: result => {
        // If there were server-side errors, update the validation result
        if (result.errors.length > 0) {
          setValidationResult(prev =>
            prev
              ? {
                  ...prev,
                  errors: [...prev.errors, ...result.errors],
                }
              : null,
          );
        }

        // Close dialog on success (even partial)
        if (result.success > 0) {
          onClose?.();
        } else {
          setDialogState('validated');
        }
      },
      onError: () => {
        setDialogState('validated');
      },
    });
  }, [validationResult, importProducts, onClose]);

  const handleClose = useCallback(() => {
    if (!isPending) {
      onClose?.();
    }
  }, [isPending, onClose]);

  const isLoading = dialogState === 'parsing' || dialogState === 'importing';
  const canImport = dialogState === 'validated' && validationResult && validationResult.validProducts.length > 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={t('importProducts.title')}
      description={t('importProducts.description')}
      onSubmit={canImport ? handleImport : undefined}
      confirmButtonText={t('importProducts.import')}
      cancelButtonText={t('importProducts.cancel')}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={!canImport || isPending}
      scrollable
      actionsSlot={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" />
              {t('importProducts.downloadTemplate')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <a href="/templates/product-import-template.csv" download>
                {t('importProducts.downloadCsv')}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/templates/product-import-template.xlsx" download>
                {t('importProducts.downloadXlsx')}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }>
      <div className="space-y-4">
        <FileDropzone onFileSelect={handleFileSelect} disabled={isLoading} selectedFileName={selectedFile?.name} />

        {/* Parse errors */}
        {parseErrors.length > 0 && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
            {parseErrors.map((error, index) => (
              <p key={index} className="text-sm text-destructive">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Loading state */}
        {dialogState === 'parsing' && (
          <p className="text-center text-sm text-muted-foreground">{t('importProducts.parsing')}</p>
        )}

        {dialogState === 'importing' && (
          <p className="text-center text-sm text-muted-foreground">{t('importProducts.importing')}</p>
        )}

        {/* Validation result */}
        {dialogState === 'validated' && validationResult && (
          <div className="space-y-2">
            {validationResult.validProducts.length > 0 && (
              <p className="text-sm text-green-600 dark:text-green-400">
                {t('importProducts.preview.readyToImport', {
                  count: validationResult.validProducts.length,
                })}
              </p>
            )}

            {validationResult.errors.length > 0 && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {t('importProducts.preview.errorsFound', { count: validationResult.errors.length })}
              </p>
            )}
          </div>
        )}

        {/* Validation errors table */}
        {validationResult && validationResult.errors.length > 0 && (
          <ImportErrorsTable errors={validationResult.errors} />
        )}
      </div>
    </Dialog>
  );
};

export default ImportProductsDialog;
