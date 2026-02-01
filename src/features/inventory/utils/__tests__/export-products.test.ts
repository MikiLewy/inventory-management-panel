import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ExportRow,
  formatProductForExport,
  generateExportFile,
  generateExportFilename,
  getExportMimeType,
  ProductForExport,
  triggerDownload,
} from '../export-products';

describe('formatProductForExport', () => {
  const baseProduct: ProductForExport = {
    name: 'Nike Air Max 90',
    sku: 'SKU-001',
    size: '42',
    purchasePrice: 150.0,
    purchaseDate: new Date('2024-01-15'),
    status: 'IN_STOCK',
    brand: 'Nike',
    category: {
      id: 1,
      translations: { en: 'Sneakers', pl: 'Sneakersy' },
    },
    purchasePlace: 'StockX',
    sizeUnit: 'EU',
    warehouseName: 'Main Warehouse',
  };

  it('should format product with all fields', () => {
    const result = formatProductForExport(baseProduct, 'en');

    expect(result).toEqual({
      name: 'Nike Air Max 90',
      sku: 'SKU-001',
      size: '42',
      purchasePrice: 150.0,
      purchaseDate: '2024-01-15',
      status: 'IN_STOCK',
      brand: 'Nike',
      category: 'Sneakers',
      purchasePlace: 'StockX',
      sizeUnit: 'EU',
      warehouse: 'Main Warehouse',
    });
  });

  it('should use Polish translation when locale is pl', () => {
    const result = formatProductForExport(baseProduct, 'pl');

    expect(result.category).toBe('Sneakersy');
  });

  it('should fallback to English if locale not found', () => {
    const result = formatProductForExport(baseProduct, 'de'); // German not available

    expect(result.category).toBe('Sneakers');
  });

  it('should handle null optional fields', () => {
    const productWithNulls: ProductForExport = {
      ...baseProduct,
      brand: null,
      category: null,
      purchasePlace: null,
      purchaseDate: null,
      warehouseName: null,
    };

    const result = formatProductForExport(productWithNulls, 'en');

    expect(result.brand).toBe('');
    expect(result.category).toBe('');
    expect(result.purchasePlace).toBe('');
    expect(result.purchaseDate).toBe('');
    expect(result.warehouse).toBe('');
  });

  it('should format date as ISO string (YYYY-MM-DD)', () => {
    const result = formatProductForExport(baseProduct, 'en');

    expect(result.purchaseDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should handle date as string input', () => {
    const productWithStringDate: ProductForExport = {
      ...baseProduct,
      purchaseDate: '2024-06-20T10:30:00Z',
    };

    const result = formatProductForExport(productWithStringDate, 'en');

    expect(result.purchaseDate).toBe('2024-06-20');
  });

  it('should use first available translation if no matching locale', () => {
    const productWithOnlyPl: ProductForExport = {
      ...baseProduct,
      category: {
        id: 1,
        translations: { pl: 'Sneakersy' },
      },
    };

    const result = formatProductForExport(productWithOnlyPl, 'en');

    expect(result.category).toBe('Sneakersy');
  });

  it('should default status to IN_STOCK if null', () => {
    const productWithNullStatus: ProductForExport = {
      ...baseProduct,
      status: null,
    };

    const result = formatProductForExport(productWithNullStatus, 'en');

    expect(result.status).toBe('IN_STOCK');
  });

  it('should default sizeUnit to EU if null', () => {
    const productWithNullSizeUnit: ProductForExport = {
      ...baseProduct,
      sizeUnit: null,
    };

    const result = formatProductForExport(productWithNullSizeUnit, 'en');

    expect(result.sizeUnit).toBe('EU');
  });
});

describe('generateExportFile', () => {
  const testProducts: ExportRow[] = [
    {
      name: 'Nike Air Max 90',
      sku: 'SKU-001',
      size: '42',
      purchasePrice: 150.0,
      purchaseDate: '2024-01-15',
      status: 'IN_STOCK',
      brand: 'Nike',
      category: 'Sneakers',
      purchasePlace: 'StockX',
      sizeUnit: 'EU',
      warehouse: 'Main Warehouse',
    },
    {
      name: 'Adidas Ultraboost',
      sku: 'SKU-002',
      size: '10.5',
      purchasePrice: 180.0,
      purchaseDate: '2024-02-20',
      status: 'IN_DELIVERY',
      brand: 'Adidas',
      category: 'Sneakers',
      purchasePlace: 'GOAT',
      sizeUnit: 'US',
      warehouse: 'Main Warehouse',
    },
  ];

  it('should generate valid CSV buffer', () => {
    const result = generateExportFile(testProducts, 'csv');

    expect(result).toBeInstanceOf(Buffer);

    const csvContent = result.toString('utf-8');
    // Should have UTF-8 BOM
    expect(csvContent.charCodeAt(0)).toBe(0xfeff);
    // Should contain header row
    expect(csvContent).toContain('name');
    expect(csvContent).toContain('sku');
    // Should contain data
    expect(csvContent).toContain('Nike Air Max 90');
    expect(csvContent).toContain('Adidas Ultraboost');
  });

  it('should generate valid XLSX buffer', () => {
    const result = generateExportFile(testProducts, 'xlsx');

    expect(result).toBeInstanceOf(Buffer);
    // XLSX files start with PK (ZIP signature)
    expect(result[0]).toBe(0x50); // 'P'
    expect(result[1]).toBe(0x4b); // 'K'
  });

  it('should handle empty products array for CSV', () => {
    const result = generateExportFile([], 'csv');

    expect(result).toBeInstanceOf(Buffer);
    const csvContent = result.toString('utf-8');
    // Should still have BOM even if empty
    expect(csvContent.charCodeAt(0)).toBe(0xfeff);
  });

  it('should handle empty products array for XLSX', () => {
    const result = generateExportFile([], 'xlsx');

    expect(result).toBeInstanceOf(Buffer);
  });

  it('should escape special characters in CSV', () => {
    const productsWithSpecialChars: ExportRow[] = [
      {
        name: 'Product with, comma',
        sku: 'SKU-"quoted"',
        size: '42',
        purchasePrice: 150.0,
        purchaseDate: '2024-01-15',
        status: 'IN_STOCK',
        brand: 'Brand\nwith\nnewlines',
        category: 'Category',
        purchasePlace: 'Place',
        sizeUnit: 'EU',
        warehouse: 'Warehouse',
      },
    ];

    const result = generateExportFile(productsWithSpecialChars, 'csv');
    const csvContent = result.toString('utf-8');

    // CSV should properly handle special characters
    expect(csvContent).toContain('Product with, comma');
  });
});

describe('triggerDownload', () => {
  let mockCreateObjectURL: ReturnType<typeof vi.fn>;
  let mockRevokeObjectURL: ReturnType<typeof vi.fn>;
  let mockAppendChild: ReturnType<typeof vi.fn>;
  let mockRemoveChild: ReturnType<typeof vi.fn>;
  let mockClick: ReturnType<typeof vi.fn>;
  let mockLink: HTMLAnchorElement;

  beforeEach(() => {
    mockCreateObjectURL = vi.fn().mockReturnValue('blob:mock-url');
    mockRevokeObjectURL = vi.fn();
    mockAppendChild = vi.fn();
    mockRemoveChild = vi.fn();
    mockClick = vi.fn();

    // Create mock link element
    mockLink = {
      href: '',
      download: '',
      click: mockClick,
    } as unknown as HTMLAnchorElement;

    // Mock DOM APIs
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
    vi.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild);
    vi.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild);
  });

  it('should create and click download link', () => {
    const base64Data = btoa('test content');

    triggerDownload(base64Data, 'test.csv', 'text/csv');

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockClick).toHaveBeenCalled();
  });

  it('should set correct filename and mime type', () => {
    const base64Data = btoa('test content');

    triggerDownload(
      base64Data,
      'products-export-2024-01-15.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    expect(mockLink.download).toBe('products-export-2024-01-15.xlsx');
  });

  it('should revoke object URL after download', () => {
    const base64Data = btoa('test content');

    triggerDownload(base64Data, 'test.csv', 'text/csv');

    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('should append link to body and remove after click', () => {
    const base64Data = btoa('test content');

    triggerDownload(base64Data, 'test.csv', 'text/csv');

    expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
    expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
  });
});

describe('generateExportFilename', () => {
  it('should generate CSV filename with date', () => {
    const filename = generateExportFilename('csv');

    expect(filename).toMatch(/^products-export-\d{4}-\d{2}-\d{2}\.csv$/);
  });

  it('should generate XLSX filename with date', () => {
    const filename = generateExportFilename('xlsx');

    expect(filename).toMatch(/^products-export-\d{4}-\d{2}-\d{2}\.xlsx$/);
  });

  it('should use current date', () => {
    const today = new Date().toISOString().split('T')[0];
    const filename = generateExportFilename('csv');

    expect(filename).toContain(today);
  });
});

describe('getExportMimeType', () => {
  it('should return correct MIME type for CSV', () => {
    expect(getExportMimeType('csv')).toBe('text/csv;charset=utf-8');
  });

  it('should return correct MIME type for XLSX', () => {
    expect(getExportMimeType('xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
});
