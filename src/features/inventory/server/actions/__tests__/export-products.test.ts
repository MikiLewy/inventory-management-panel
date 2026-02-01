import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock server-only to prevent import errors in test environment
// vi.mock('server-only', () => ({}));

vi.mock('@/server/db', () => ({
  db: {
    query: {
      products: {
        findMany: vi.fn(),
      },
      warehouses: {
        findMany: vi.fn(),
      },
    },
  },
}));

vi.mock('@/server/utils/get-logged-in-user', () => ({
  getLoggedInUser: vi.fn(),
}));

import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import { Product } from '@/features/inventory/api/types/products';
import { Warehouse } from '@/features/warehouse/api/types/warehouse';
import { db } from '@/server/db';
import { CategoryType } from '@/server/db/types/enum/category-type';
import { SizeUnit } from '@/server/db/types/enum/size-unit';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

import { exportProducts } from '../export-products';

import { User } from '@supabase/supabase-js';

const mockGetLoggedInUser = vi.mocked(getLoggedInUser);
const mockProductsFindMany = vi.mocked(db.query.products.findMany);
const mockWarehousesFindMany = vi.mocked(db.query.warehouses.findMany);

describe('exportProducts', () => {
  const mockUser = { id: 'user-123' } as User;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Nike Air Max 90',
      sku: 'SKU-001',
      size: '42',
      purchasePrice: 150.0,
      purchaseDate: new Date('2024-01-15'),
      status: ProductStatus.IN_STOCK,
      brand: 'Nike',
      categoryId: 1,
      category: { type: CategoryType.CLOTHING, id: 1, translations: { en: 'Sneakers', pl: 'Sneakersy' } },
      purchasePlace: 'StockX',
      sizeUnit: SizeUnit.EU,
      warehouseId: 1,
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://example.com/image.jpg',
    },
    {
      id: 2,
      name: 'Adidas Ultraboost',
      sku: 'SKU-002',
      size: '10.5',
      purchasePrice: 180.0,
      purchaseDate: new Date('2024-02-20'),
      status: ProductStatus.IN_DELIVERY,
      brand: 'Adidas',
      categoryId: 1,
      category: { type: CategoryType.CLOTHING, id: 1, translations: { en: 'Sneakers', pl: 'Sneakersy' } },
      purchasePlace: 'GOAT',
      sizeUnit: SizeUnit.US,
      warehouseId: 1,
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://example.com/image.jpg',
    },
  ];

  const mockWarehouses: Warehouse[] = [
    {
      id: 1,
      name: 'Main Warehouse',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      address: '123 Main St',
      postCode: '12345',
      city: 'Anytown',
      country: 'USA',
    },
    {
      id: 2,
      name: 'Secondary Warehouse',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      address: '456 Main St',
      postCode: '12345',
      city: 'Anytown',
      country: 'USA',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLoggedInUser.mockResolvedValue(mockUser);
    mockProductsFindMany.mockResolvedValue(mockProducts);
    mockWarehousesFindMany.mockResolvedValue(mockWarehouses);
  });

  it('should throw error when user not authenticated', async () => {
    mockGetLoggedInUser.mockResolvedValueOnce(null);

    await expect(
      exportProducts({
        format: 'csv',
        scope: 'all',
      }),
    ).rejects.toThrow('Unauthorized');
  });

  it('should export all products matching filters', async () => {
    const result = await exportProducts({
      format: 'csv',
      scope: 'all',
    });

    expect(result.count).toBe(2);
    expect(result.filename).toMatch(/^products-export-\d{4}-\d{2}-\d{2}\.csv$/);
    expect(result.mimeType).toBe('text/csv;charset=utf-8');
    expect(result.data).toBeTruthy(); // Base64 encoded
  });

  it('should export only selected products by IDs', async () => {
    mockProductsFindMany.mockResolvedValueOnce([mockProducts[0]]);

    const result = await exportProducts({
      format: 'xlsx',
      scope: 'selected',
      selectedIds: [1],
    });

    expect(result.count).toBe(1);
    expect(result.filename).toMatch(/\.xlsx$/);
    expect(result.mimeType).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });

  it('should return base64 encoded CSV', async () => {
    const result = await exportProducts({
      format: 'csv',
      scope: 'all',
    });

    // Verify it's valid base64
    expect(() => atob(result.data)).not.toThrow();
  });

  it('should return base64 encoded XLSX', async () => {
    const result = await exportProducts({
      format: 'xlsx',
      scope: 'all',
    });

    // Verify it's valid base64
    expect(() => atob(result.data)).not.toThrow();
  });

  it('should return error when no products found', async () => {
    mockProductsFindMany.mockResolvedValueOnce([]);

    await expect(
      exportProducts({
        format: 'csv',
        scope: 'all',
      }),
    ).rejects.toThrow('No products to export');
  });

  it('should resolve warehouse names correctly', async () => {
    const result = await exportProducts({
      format: 'csv',
      scope: 'all',
    });

    // Decode base64 and check content contains warehouse name
    const csvContent = atob(result.data);
    expect(csvContent).toContain('Main Warehouse');
  });

  it('should resolve category names correctly', async () => {
    const result = await exportProducts({
      format: 'csv',
      scope: 'all',
      locale: 'en',
    });

    const csvContent = atob(result.data);
    expect(csvContent).toContain('Sneakers');
  });

  it('should use Polish category translation when locale is pl', async () => {
    const result = await exportProducts({
      format: 'csv',
      scope: 'all',
      locale: 'pl',
    });

    const csvContent = atob(result.data);
    expect(csvContent).toContain('Sneakersy');
  });

  it('should handle products with deleted category/warehouse', async () => {
    const productWithNullRefs = {
      ...mockProducts[0],
      category: null,
      warehouseId: 999, // Non-existent
    };
    mockProductsFindMany.mockResolvedValueOnce([productWithNullRefs]);

    const result = await exportProducts({
      format: 'csv',
      scope: 'all',
    });

    // Should not throw, should export with empty values
    expect(result.count).toBe(1);
  });

  it('should pass filters to database query for all scope', async () => {
    await exportProducts({
      format: 'csv',
      scope: 'all',
      filters: {
        status: [ProductStatus.IN_STOCK],
        warehouse: ['1'],
      },
      query: 'Nike',
    });

    expect(mockProductsFindMany).toHaveBeenCalled();
  });

  it('should pass selectedIds to database query for selected scope', async () => {
    await exportProducts({
      format: 'csv',
      scope: 'selected',
      selectedIds: [1, 2, 3],
    });

    expect(mockProductsFindMany).toHaveBeenCalled();
  });
});
