import {
  ExportColumn,
  ExportRow,
  getExportMimeType,
  generateExportFile as sharedGenerateExportFile,
  generateExportFilename as sharedGenerateExportFilename,
} from '@/shared/utils/export';

export interface SaleForExport {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  purchaseDate: Date | string | null;
  soldPrice: number;
  soldDate: Date | string | null;
  soldPlace: string | null;
  profit: number;
  brand: string | null;
  category: {
    id: number;
    translations: Record<string, string> | null;
  } | null;
  purchasePlace: string | null;
  sizeUnit: string | null;
}

export const EXPORT_COLUMNS: ExportColumn[] = [
  { key: 'name', header: 'Name', width: 30 },
  { key: 'sku', header: 'SKU', width: 15 },
  { key: 'size', header: 'Size', width: 8 },
  { key: 'purchasePrice', header: 'Purchase Price', width: 14 },
  { key: 'purchaseDate', header: 'Purchase Date', width: 12 },
  { key: 'soldPrice', header: 'Sold Price', width: 12 },
  { key: 'soldDate', header: 'Sold Date', width: 12 },
  { key: 'soldPlace', header: 'Sold Place', width: 15 },
  { key: 'profit', header: 'Profit', width: 12 },
  { key: 'brand', header: 'Brand', width: 15 },
  { key: 'category', header: 'Category', width: 15 },
  { key: 'purchasePlace', header: 'Purchase Place', width: 15 },
  { key: 'sizeUnit', header: 'Size Unit', width: 10 },
];

export function formatSaleForExport(sale: SaleForExport, locale: string = 'en'): ExportRow {
  let categoryName = '';
  if (sale.category?.translations) {
    const translations = sale.category.translations;
    categoryName = translations[locale] || translations['en'] || Object.values(translations)[0] || '';
  }

  let purchaseDate = '';
  if (sale.purchaseDate) {
    const date = sale.purchaseDate instanceof Date ? sale.purchaseDate : new Date(sale.purchaseDate);
    purchaseDate = date.toISOString().split('T')[0];
  }

  let soldDate = '';
  if (sale.soldDate) {
    const date = sale.soldDate instanceof Date ? sale.soldDate : new Date(sale.soldDate);
    soldDate = date.toISOString().split('T')[0];
  }

  return {
    name: sale.name,
    sku: sale.sku,
    size: sale.size,
    purchasePrice: sale.purchasePrice,
    purchaseDate,
    soldPrice: sale.soldPrice,
    soldDate,
    soldPlace: sale.soldPlace || '',
    profit: sale.profit,
    brand: sale.brand || '',
    category: categoryName,
    purchasePlace: sale.purchasePlace || '',
    sizeUnit: sale.sizeUnit || 'EU',
  };
}

export function generateExportFile(rows: ExportRow[]): Buffer {
  return sharedGenerateExportFile(rows, EXPORT_COLUMNS, 'xlsx');
}

export function generateExportFilename(format: 'csv' | 'xlsx'): string {
  return sharedGenerateExportFilename('sales', format);
}

export { getExportMimeType };
