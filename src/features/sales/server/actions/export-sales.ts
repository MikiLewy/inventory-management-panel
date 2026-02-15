'use server';
import 'server-only';

import { and, between, eq, gt, ilike, inArray, lt, or } from 'drizzle-orm';

import { db } from '@/server/db';
import { sales } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';
import { ExportResult } from '@/shared/types/import-export';
import {
  getExportMimeType,
  generateExportFile as sharedGenerateExportFile,
  generateExportFilename as sharedGenerateExportFilename,
} from '@/shared/utils/export';

import { ExportSalesParams } from '../../types/payload/export-sales';
import { EXPORT_COLUMNS, formatSaleForExport, SaleForExport } from '../../utils/export-sales';

const MAX_EXPORT_LIMIT = 10000;

export async function exportSales(params: ExportSalesParams): Promise<ExportResult> {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { format, scope, selectedIds, filters, query, locale = 'en' } = params;

  const whereConditions = [eq(sales.userId, user.id)];

  if (scope === 'selected' && selectedIds && selectedIds.length > 0) {
    whereConditions.push(inArray(sales.id, selectedIds));
  } else if (scope === 'all') {
    if (query) {
      whereConditions.push(or(ilike(sales.name, `%${query}%`), ilike(sales.sku, `%${query}%`))!);
    }

    if (filters?.profitPositive !== undefined) {
      if (filters.profitPositive) {
        whereConditions.push(gt(sales.profit, 0));
      } else {
        whereConditions.push(lt(sales.profit, 0));
      }
    }

    if (filters?.dateRange) {
      whereConditions.push(between(sales.soldDate, new Date(filters.dateRange.from), new Date(filters.dateRange.to)));
    }
  }

  const salesList = await db.query.sales.findMany({
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

  if (salesList.length === 0) {
    throw new Error('No sales to export');
  }

  if (salesList.length >= MAX_EXPORT_LIMIT) {
    throw new Error(`Export limit exceeded. Maximum ${MAX_EXPORT_LIMIT} sales can be exported at once.`);
  }

  // Format sales for export
  const exportRows = salesList.map(sale => {
    return formatSaleForExport(
      {
        name: sale.name,
        sku: sale.sku,
        size: sale.size,
        purchasePrice: sale.purchasePrice,
        purchaseDate: sale.purchaseDate,
        soldPrice: sale.soldPrice,
        soldDate: sale.soldDate,
        soldPlace: sale.soldPlace,
        profit: sale.profit,
        brand: sale.brand,
        category: sale.category
          ? {
              id: sale.category.id,
              translations: sale.category.translations as Record<string, string> | null,
            }
          : null,
        purchasePlace: sale.purchasePlace,
        sizeUnit: sale.sizeUnit,
      } as SaleForExport,
      locale,
    );
  });

  // Generate file
  const fileBuffer = sharedGenerateExportFile(exportRows, EXPORT_COLUMNS, format);
  const filename = sharedGenerateExportFilename('sales', format);
  const mimeType = getExportMimeType(format);

  return {
    data: fileBuffer.toString('base64'),
    filename,
    mimeType,
    count: exportRows.length,
  };
}
