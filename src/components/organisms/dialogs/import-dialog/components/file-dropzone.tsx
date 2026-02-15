'use client';

import { Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';
import { ACCEPTED_FILE_TYPES, ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from '@/shared/utils/import';

interface Props {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  selectedFileName?: string;
}

export const FileDropzone = ({ onFileSelect, disabled, selectedFileName }: Props) => {
  const t = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      setError(null);

      if (file.size > MAX_FILE_SIZE) {
        setError(t('importExport.import.validation.fileTooLarge'));
        return false;
      }

      const isValidType =
        ACCEPTED_MIME_TYPES.includes(file.type) ||
        file.name.endsWith('.csv') ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.xls');

      if (!isValidType) {
        setError(t('importExport.import.validation.invalidFileType'));
        return false;
      }

      return true;
    },
    [t],
  );

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onFileSelect(file);
      }
    },
    [validateFile, onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [disabled, handleFile],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
      e.target.value = '';
    },
    [handleFile],
  );

  return (
    <div className="space-y-2">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
          isDragging && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-50',
          error && 'border-destructive',
          !isDragging && !error && 'border-muted-foreground/25 hover:border-muted-foreground/50',
        )}>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />

        <Upload className="mb-4 h-10 w-10 text-muted-foreground" />

        {selectedFileName ? (
          <p className="mb-1 text-sm font-medium">{selectedFileName}</p>
        ) : (
          <>
            <p className="mb-1 text-sm font-medium">{t('importExport.import.selectFile')}</p>
            <p className="text-xs text-muted-foreground">{t('importExport.import.dragDrop')}</p>
          </>
        )}

        <p className="mt-2 text-xs text-muted-foreground">{t('importExport.import.supportedFormats')}</p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
