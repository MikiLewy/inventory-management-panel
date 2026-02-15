export interface ImportError {
  row: number;
  message: string;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: ImportError[];
}

export interface ValidationResult<T> {
  validRows: T[];
  errors: ImportError[];
}

export interface ParseResult<T> {
  data: T[];
  errors: string[];
}

export interface ExportColumn {
  key: string;
  header: string;
  width?: number;
}

export type ExportFormat = 'csv' | 'xlsx';

export interface ExportResult {
  data: string;
  filename: string;
  mimeType: string;
  count: number;
}

export interface ParsedRow {
  [key: string]: string | number | undefined;
}
