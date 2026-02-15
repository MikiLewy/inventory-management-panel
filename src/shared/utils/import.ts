import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ParsedRow {
  [key: string]: string | number | undefined;
}

export interface ParseResult<T> {
  data: T[];
  errors: string[];
}

const normalizeColumnName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, '');
};

const mapColumnHeaders = (headers: string[], columnMappings: Record<string, string>): Record<string, string> => {
  const mapping: Record<string, string> = {};

  headers.forEach(header => {
    const normalized = normalizeColumnName(header);
    const mappedName = columnMappings[normalized];
    if (mappedName) {
      mapping[header] = mappedName;
    }
  });

  return mapping;
};

const parseCSV = async <T>(
  file: File,
  columnMappings: Record<string, string>,
  requiredColumns: string[],
): Promise<ParseResult<T>> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.trim(),
      complete: results => {
        if (results.errors.length > 0) {
          const errors = results.errors.map(e => `Row ${e.row}: ${e.message}`);
          resolve({ data: [], errors });
          return;
        }

        if (!results.data || results.data.length === 0) {
          resolve({ data: [], errors: ['File is empty or contains only headers'] });
          return;
        }

        const headers = results.meta.fields || [];
        const columnMapping = mapColumnHeaders(headers, columnMappings);

        // Check for required columns
        const mappedColumns = Object.values(columnMapping);
        const missingColumns = requiredColumns.filter(col => !mappedColumns.includes(col));

        if (missingColumns.length > 0) {
          resolve({
            data: [],
            errors: [`Missing required columns: ${missingColumns.join(', ')}`],
          });
          return;
        }

        // Map data to normalized column names
        const mappedData: ParsedRow[] = results.data.map(row => {
          const mappedRow: ParsedRow = {};
          Object.entries(row).forEach(([key, value]) => {
            const mappedKey = columnMapping[key];
            if (mappedKey) {
              mappedRow[mappedKey] = value;
            }
          });
          return mappedRow;
        });

        resolve({ data: mappedData as T[], errors: [] });
      },
      error: error => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      },
    });
  });
};

const parseExcel = async <T>(
  file: File,
  columnMappings: Record<string, string>,
  requiredColumns: string[],
): Promise<ParseResult<T>> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    return { data: [], errors: ['Excel file has no sheets'] };
  }

  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: false,
  });

  if (!jsonData || jsonData.length === 0) {
    return { data: [], errors: ['File is empty or contains only headers'] };
  }

  const headers = Object.keys(jsonData[0] || {});
  const columnMapping = mapColumnHeaders(headers, columnMappings);

  // Check for required columns
  const mappedColumns = Object.values(columnMapping);
  const missingColumns = requiredColumns.filter(col => !mappedColumns.includes(col));

  if (missingColumns.length > 0) {
    return {
      data: [],
      errors: [`Missing required columns: ${missingColumns.join(', ')}`],
    };
  }

  // Map data to normalized column names
  const mappedData: ParsedRow[] = jsonData.map(row => {
    const mappedRow: ParsedRow = {};
    Object.entries(row).forEach(([key, value]) => {
      const mappedKey = columnMapping[key];
      if (mappedKey) {
        // Handle date objects from Excel
        if (value instanceof Date) {
          mappedRow[mappedKey] = value.toISOString().split('T')[0];
        } else {
          mappedRow[mappedKey] = String(value);
        }
      }
    });
    return mappedRow;
  });

  return { data: mappedData as T[], errors: [] };
};

export const parseImportFile = async <T>(
  file: File,
  columnMappings: Record<string, string>,
  requiredColumns: string[],
): Promise<ParseResult<T>> => {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.csv')) {
    return parseCSV<T>(file, columnMappings, requiredColumns);
  }

  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    return parseExcel<T>(file, columnMappings, requiredColumns);
  }

  return {
    data: [],
    errors: ['Unsupported file type. Please use CSV, XLS, or XLSX files.'],
  };
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const MAX_ROWS = 5000;

export const ACCEPTED_FILE_TYPES = '.csv,.xls,.xlsx';

export const ACCEPTED_MIME_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
