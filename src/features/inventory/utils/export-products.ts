import * as XLSX from 'xlsx';

export interface ExportRow {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  purchaseDate: string;
  status: string;
  brand: string;
  category: string;
  purchasePlace: string;
  sizeUnit: string;
  warehouse: string;
}

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

export function generateExportFile(products: ExportRow[], format: 'csv' | 'xlsx'): Buffer {
  const worksheet = XLSX.utils.json_to_sheet(products);

  worksheet['!cols'] = [
    { wch: 30 }, // name
    { wch: 15 }, // sku
    { wch: 8 }, // size
    { wch: 14 }, // purchasePrice
    { wch: 12 }, // purchaseDate
    { wch: 12 }, // status
    { wch: 15 }, // brand
    { wch: 15 }, // category
    { wch: 15 }, // purchasePlace
    { wch: 10 }, // sizeUnit
    { wch: 20 }, // warehouse
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  if (format === 'csv') {
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const bom = '\uFEFF';

    return Buffer.from(bom + csvContent, 'utf-8');
  } else {
    return Buffer.from(XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }));
  }
}

export function triggerDownload(base64Data: string, filename: string, mimeType: string): void {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateExportFilename(format: 'csv' | 'xlsx'): string {
  const date = new Date().toISOString().split('T')[0];

  return `products-export-${date}.${format}`;
}

export function getExportMimeType(format: 'csv' | 'xlsx'): string {
  return format === 'csv'
    ? 'text/csv;charset=utf-8'
    : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}
