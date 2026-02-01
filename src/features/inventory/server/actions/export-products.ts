'use server';
import 'server-only';

import { and, between, eq, ilike, inArray, or } from 'drizzle-orm';

import { db } from '@/server/db';
import { products, warehouses } from '@/server/db/schema';
import { ProductStatus } from '@/server/db/types/enum/product-status';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

import {
  ExportRow,
  formatProductForExport,
  generateExportFile,
  generateExportFilename,
  getExportMimeType,
} from '../../utils/export-products';

const MAX_EXPORT_LIMIT = 10000;

export interface ExportProductsParams {
  format: 'csv' | 'xlsx';
  scope: 'all' | 'selected';
  selectedIds?: number[];
  filters?: {
    status?: ProductStatus[];
    warehouse?: string[];
    dateRange?: { from: string; to: string };
  };
  query?: string;
  locale?: string;
}

export interface ExportProductsResult {
  data: string;
  filename: string;
  mimeType: string;
  count: number;
}

export async function exportProducts(params: ExportProductsParams): Promise<ExportProductsResult> {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { format, scope, selectedIds, filters, query, locale = 'en' } = params;

  const whereConditions = [eq(products.userId, user.id)];

  if (scope === 'selected' && selectedIds && selectedIds.length > 0) {
    whereConditions.push(inArray(products.id, selectedIds));
  } else if (scope === 'all') {
    if (query) {
      whereConditions.push(or(ilike(products.name, `%${query}%`), ilike(products.sku, `%${query}%`))!);
    }

    if (filters?.status && filters.status.length > 0) {
      whereConditions.push(inArray(products.status, filters.status));
    }

    if (filters?.dateRange) {
      whereConditions.push(
        between(products.purchaseDate, new Date(filters.dateRange.from), new Date(filters.dateRange.to)),
      );
    }

    if (filters?.warehouse && filters.warehouse.length > 0) {
      whereConditions.push(inArray(products.warehouseId, filters.warehouse.map(Number)));
    }
  }

  const productsList = await db.query.products.findMany({
    where: and(...whereConditions),
    limit: MAX_EXPORT_LIMIT,
    with: {
      category: {
        columns: {
          id: true,
          translations: true,
        },
      },
    },
  });

  if (productsList.length === 0) {
    throw new Error('No products to export');
  }

  if (productsList.length >= MAX_EXPORT_LIMIT) {
    throw new Error(`Export limit exceeded. Maximum ${MAX_EXPORT_LIMIT} products can be exported at once.`);
  }

  // Fetch warehouses to map IDs to names
  const warehousesList = await db.query.warehouses.findMany({
    where: eq(warehouses.userId, user.id),
  });

  const warehouseMap = new Map(warehousesList.map(w => [w.id, w.name]));

  // Format products for export
  const exportRows: ExportRow[] = productsList.map(product => {
    const warehouseName = product.warehouseId ? warehouseMap.get(product.warehouseId) || '' : '';

    return formatProductForExport(
      {
        name: product.name,
        sku: product.sku,
        size: product.size,
        purchasePrice: product.purchasePrice,
        purchaseDate: product.purchaseDate,
        status: product.status,
        brand: product.brand,
        category: product.category
          ? {
              id: product.category.id,
              translations: product.category.translations as Record<string, string> | null,
            }
          : null,
        purchasePlace: product.purchasePlace,
        sizeUnit: product.sizeUnit,
        warehouseName,
      },
      locale,
    );
  });

  // Generate file
  const fileBuffer = generateExportFile(exportRows, format);
  const filename = generateExportFilename(format);
  const mimeType = getExportMimeType(format);

  return {
    data: fileBuffer.toString('base64'),
    filename,
    mimeType,
    count: exportRows.length,
  };
}
