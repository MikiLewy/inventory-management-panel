'use server';
import 'server-only';

import pLimit from 'p-limit';

import { db } from '@/server/db';
import { sales } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';
import { ImportError, ImportResult } from '@/shared/types/import-export';
import { resolveCategoryId } from '@/shared/utils/resolve-ids';
import { SizeUnit } from '@/types/enum/size-unit';

import { ImportSalePayload } from '../../types/payload/import-sales';
import { calculateSaleProfit } from '../../utils/calculate-sale-profit';

export const importSales = async (salesToImport: ImportSalePayload[]): Promise<ImportResult> => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const categoriesList = await db.query.categories.findMany();

  const limit = pLimit(25);

  const insertResults = await Promise.allSettled(
    salesToImport.map((sale, index) =>
      limit(async () => {
        const rowNumber = index + 2; // +2 for 1-indexed + header row

        // Resolve category by name (match against translations)
        const categoryId = resolveCategoryId(sale.category, categoriesList);
        if (sale.category && categoryId === null) {
          throw new Error(`Category "${sale.category}" not found`);
        }

        // Calculate profit
        const profit = calculateSaleProfit(sale.soldPrice, sale.purchasePrice);

        await db.insert(sales).values({
          name: sale.name,
          sku: sale.sku,
          size: sale.size,
          purchasePrice: sale.purchasePrice,
          soldPrice: sale.soldPrice,
          profit,
          purchaseDate: sale.purchaseDate ? new Date(sale.purchaseDate) : undefined,
          soldDate: sale.soldDate ? new Date(sale.soldDate) : undefined,
          soldPlace: sale.soldPlace,
          brand: sale.brand,
          categoryId,
          purchasePlace: sale.purchasePlace,
          sizeUnit: (sale.sizeUnit as SizeUnit) || SizeUnit.EU,
          userId: user.id,
          createdAt: new Date(),
        });

        return rowNumber;
      }),
    ),
  );

  const errors: ImportError[] = [];
  let success = 0;
  let failed = 0;

  insertResults.forEach((result, index) => {
    const rowNumber = index + 2;
    if (result.status === 'fulfilled') {
      success++;
    } else {
      failed++;
      errors.push({
        row: rowNumber,
        message: result.reason?.message || 'Unknown error',
      });
    }
  });

  return { success, failed, errors };
};
