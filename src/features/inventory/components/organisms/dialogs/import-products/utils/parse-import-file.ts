import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ParsedRow {
  name?: string;
  sku?: string;
  size?: string;
  purchasePrice?: string | number;
  purchaseDate?: string;
  status?: string;
  brand?: string;
  category?: string;
  purchasePlace?: string;
  sizeUnit?: string;
  warehouse?: string;
  [key: string]: string | number | undefined;
}

export interface ParseResult {
  data: ParsedRow[];
  errors: string[];
}

const REQUIRED_COLUMNS = ['name', 'sku', 'size', 'purchasePrice'];

const normalizeColumnName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, '');
};

const COLUMN_MAPPINGS: Record<string, string> = {
  name: 'name',
  sku: 'sku',
  size: 'size',
  purchaseprice: 'purchasePrice',
  price: 'purchasePrice',
  purchasedate: 'purchaseDate',
  date: 'purchaseDate',
  status: 'status',
  brand: 'brand',
  category: 'category',
  purchaseplace: 'purchasePlace',
  place: 'purchasePlace',
  sizeunit: 'sizeUnit',
  unit: 'sizeUnit',
  warehouse: 'warehouse',
};

const mapColumnHeaders = (headers: string[]): Record<string, string> => {
  const mapping: Record<string, string> = {};

  headers.forEach(header => {
    const normalized = normalizeColumnName(header);
    const mappedName = COLUMN_MAPPINGS[normalized];
    if (mappedName) {
      mapping[header] = mappedName;
    }
  });

  return mapping;
};

const parseCSV = (file: File): Promise<ParseResult> => {
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
        const columnMapping = mapColumnHeaders(headers);

        // Check for required columns
        const mappedColumns = Object.values(columnMapping);
        const missingColumns = REQUIRED_COLUMNS.filter(col => !mappedColumns.includes(col));

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

        resolve({ data: mappedData, errors: [] });
      },
      error: error => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      },
    });
  });
};

const parseExcel = async (file: File): Promise<ParseResult> => {
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
  const columnMapping = mapColumnHeaders(headers);

  // Check for required columns
  const mappedColumns = Object.values(columnMapping);
  const missingColumns = REQUIRED_COLUMNS.filter(col => !mappedColumns.includes(col));

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

  return { data: mappedData, errors: [] };
};

export const parseImportFile = async (file: File): Promise<ParseResult> => {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.csv')) {
    return parseCSV(file);
  }

  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    return parseExcel(file);
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
