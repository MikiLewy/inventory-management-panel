import {
  ExportColumn,
  ExportFormat,
  ExportRow,
  generateExportFile as sharedGenerateExportFile,
  generateExportFilename as sharedGenerateExportFilename,
} from '@/shared/utils/export';

export interface ProductForExport {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  purchaseDate: Date | string | null;
  status: string | null;
  brand: string | null;
  category: {
    id: number;
    translations: Record<string, string> | null;
  } | null;
  purchasePlace: string | null;
  sizeUnit: string | null;
  warehouseName: string | null;
}

const EXPORT_COLUMNS: ExportColumn[] = [
  { key: 'name', header: 'Name', width: 30 },
  { key: 'sku', header: 'SKU', width: 15 },
  { key: 'size', header: 'Size', width: 8 },
  { key: 'purchasePrice', header: 'Purchase Price', width: 14 },
  { key: 'purchaseDate', header: 'Purchase Date', width: 12 },
  { key: 'status', header: 'Status', width: 12 },
  { key: 'brand', header: 'Brand', width: 15 },
  { key: 'category', header: 'Category', width: 15 },
  { key: 'purchasePlace', header: 'Purchase Place', width: 15 },
  { key: 'sizeUnit', header: 'Size Unit', width: 10 },
  { key: 'warehouse', header: 'Warehouse', width: 20 },
];

export function formatProductForExport(product: ProductForExport, locale: string = 'en'): ExportRow {
  let categoryName = '';
  if (product.category?.translations) {
    const translations = product.category.translations;
    categoryName = translations[locale] || translations['en'] || Object.values(translations)[0] || '';
  }

  let purchaseDate = '';
  if (product.purchaseDate) {
    const date = product.purchaseDate instanceof Date ? product.purchaseDate : new Date(product.purchaseDate);
    purchaseDate = date.toISOString().split('T')[0];
  }

  return {
    name: product.name,
    sku: product.sku,
    size: product.size,
    purchasePrice: product.purchasePrice,
    purchaseDate,
    status: product.status || 'IN_STOCK',
    brand: product.brand || '',
    category: categoryName,
    purchasePlace: product.purchasePlace || '',
    sizeUnit: product.sizeUnit || 'EU',
    warehouse: product.warehouseName || '',
  };
}

export function generateExportFile(rows: ExportRow[], format: ExportFormat): Buffer {
  return sharedGenerateExportFile(rows, EXPORT_COLUMNS, format);
}

export function generateExportFilename(format: ExportFormat): string {
  return sharedGenerateExportFilename('products', format);
}
