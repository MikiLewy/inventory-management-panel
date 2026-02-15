'use client';

import { Download } from 'lucide-react';
import { useCallback, useEffect, useReducer } from 'react';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/locales/client';
import { ImportResult, ParsedRow } from '@/shared/types/import-export';
import { MAX_ROWS, parseImportFile } from '@/shared/utils/import';

import { FileDropzone } from './components/file-dropzone';
import { ImportErrorsTable } from './components/import-errors-table';
import { importDialogReducer } from './reducer';
import { initialState, ValidationResult } from './types';

export interface ImportDialogProps extends DialogActions {
  title: string;
  description: string;
  columnMappings: Record<string, string>;
  requiredColumns: string[];
  csvTemplateUrl: string;
  xlsxTemplateUrl: string;
  importButtonText: string;
  successMessageKey?: string;
  onImport: (rows: ParsedRow[], options: { onSuccess: (result: ImportResult) => void; onError: () => void }) => void;
  isPending: boolean;
}

export const ImportDialog = ({
  open,
  onClose,
  title,
  description,
  columnMappings,
  requiredColumns,
  csvTemplateUrl,
  xlsxTemplateUrl,
  importButtonText,
  onImport,
  isPending,
}: ImportDialogProps) => {
  const t = useI18n();
  const [state, dispatch] = useReducer(importDialogReducer, initialState);

  useEffect(() => {
    if (!open) {
      dispatch({ type: 'RESET' });
    }
  }, [open]);

  const handleFileSelect = useCallback(
    async (file: File) => {
      dispatch({ type: 'SET_SELECTED_FILE', payload: file });
      dispatch({ type: 'SET_DIALOG_STATE', payload: 'parsing' });
      dispatch({ type: 'SET_PARSE_ERRORS', payload: [] });
      dispatch({ type: 'SET_VALIDATION_RESULT', payload: null });

      try {
        const result = await parseImportFile<ParsedRow>(file, columnMappings, requiredColumns);

        if (result.errors.length > 0) {
          dispatch({ type: 'SET_PARSE_ERRORS', payload: result.errors });
          dispatch({ type: 'SET_DIALOG_STATE', payload: 'idle' });
          return;
        }

        if (result.data.length === 0) {
          dispatch({ type: 'SET_PARSE_ERRORS', payload: [t('importExport.import.validation.emptyFile')] });
          dispatch({ type: 'SET_DIALOG_STATE', payload: 'idle' });
          return;
        }

        if (result.data.length > MAX_ROWS) {
          dispatch({ type: 'SET_PARSE_ERRORS', payload: [t('importExport.import.validation.tooManyRows')] });
          dispatch({ type: 'SET_DIALOG_STATE', payload: 'idle' });
          return;
        }

        const validation: ValidationResult<ParsedRow> = {
          validRows: result.data,
          errors: [],
        };
        dispatch({ type: 'SET_VALIDATION_RESULT', payload: validation });
        dispatch({ type: 'SET_DIALOG_STATE', payload: 'validated' });
      } catch (error) {
        dispatch({
          type: 'SET_PARSE_ERRORS',
          payload: [error instanceof Error ? error.message : 'Failed to parse file'],
        });
        dispatch({ type: 'SET_DIALOG_STATE', payload: 'idle' });
      }
    },
    [t, columnMappings, requiredColumns],
  );

  const handleImport = useCallback(() => {
    if (!state.validationResult || state.validationResult.validRows.length === 0) return;

    dispatch({ type: 'SET_DIALOG_STATE', payload: 'importing' });

    onImport(state.validationResult.validRows, {
      onSuccess: result => {
        if (result.errors.length > 0) {
          dispatch({
            type: 'SET_VALIDATION_RESULT',
            payload: {
              validRows: state.validationResult?.validRows || [],
              errors: [...(state.validationResult?.errors || []), ...result.errors],
            } as ValidationResult<ParsedRow>,
          });
        }

        if (result.success > 0) {
          onClose?.();
        } else {
          dispatch({ type: 'SET_DIALOG_STATE', payload: 'validated' });
        }
      },
      onError: () => {
        dispatch({ type: 'SET_DIALOG_STATE', payload: 'validated' });
      },
    });
  }, [state.validationResult, onImport, onClose]);

  const isLoading = state.dialogState === 'parsing' || state.dialogState === 'importing';
  const canImport =
    state.dialogState === 'validated' && state.validationResult && state.validationResult.validRows.length > 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      onSubmit={canImport ? handleImport : undefined}
      confirmButtonText={importButtonText}
      cancelButtonText={t('importExport.import.cancel')}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={!canImport || isPending}
      scrollable
      actionsSlot={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" />
              {t('importExport.import.downloadTemplate')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <a href={csvTemplateUrl} download>
                {t('importExport.import.downloadCsv')}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={xlsxTemplateUrl} download>
                {t('importExport.import.downloadXlsx')}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }>
      <div className="space-y-4">
        <FileDropzone
          onFileSelect={handleFileSelect}
          disabled={isLoading}
          selectedFileName={state.selectedFile?.name}
        />

        {state.parseErrors.length > 0 && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
            {state.parseErrors.map((error, index) => (
              <p key={index} className="text-sm text-destructive">
                {error}
              </p>
            ))}
          </div>
        )}

        {state.dialogState === 'parsing' && (
          <p className="text-center text-sm text-muted-foreground">{t('importExport.import.parsing')}</p>
        )}

        {state.dialogState === 'importing' && (
          <p className="text-center text-sm text-muted-foreground">{t('importExport.import.importing')}</p>
        )}

        {state.dialogState === 'validated' && state.validationResult && (
          <div className="space-y-2">
            {state.validationResult.validRows.length > 0 && (
              <p className="text-sm text-green-600 dark:text-green-400">
                {t('importExport.import.preview.readyToImport', {
                  count: state.validationResult.validRows.length,
                })}
              </p>
            )}

            {state.validationResult.errors.length > 0 && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {t('importExport.import.preview.errorsFound', { count: state.validationResult.errors.length })}
              </p>
            )}
          </div>
        )}

        {state.validationResult && state.validationResult.errors.length > 0 && (
          <ImportErrorsTable errors={state.validationResult.errors} />
        )}
      </div>
    </Dialog>
  );
};

export default ImportDialog;
