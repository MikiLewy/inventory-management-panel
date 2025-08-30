'use server';
'server-only';

import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { products, sales } from '@/server/db/schema';
import { ProductStatus } from '@/server/db/types/enum/product-status';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';
import { SizeUnit } from '@/types/enum/size-unit';

import { CreateSaleFormValues } from '../../components/organisms/create-new-sale-sheet/create-new-sale-sheet';
import { UpdateSalePayload } from '../../types/payload/update-sale';
import { calculateSaleProfit } from '../../utils/calculate-sale-profit';

export const createSale = async (payload: CreateSaleFormValues) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const {
    name,
    sku,
    categoryId,
    purchasePrice,
    size,
    purchaseDate,
    purchasePlace,
    brand,
    imageUrl,
    soldPrice,
    soldDate,
    soldPlace,
  } = payload;

  try {
    db.insert(sales).values({
      name,
      sku,
      size,
      categoryId,
      purchasePrice,
      purchaseDate: new Date(purchaseDate || new Date()),
      brand,
      sizeUnit: SizeUnit.EU,
      imageUrl,
      purchasePlace,
      soldPrice,
      soldDate: new Date(soldDate || new Date()),
      soldPlace,
      profit: calculateSaleProfit(soldPrice, purchasePrice),
      createdAt: new Date(),
      userId: user?.id || '',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const updateSale = async (id: number, payload: UpdateSalePayload) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const {
    name,
    sku,
    categoryId,
    purchasePrice,
    size,
    purchaseDate,
    purchasePlace,
    brand,
    imageUrl,
    sizeUnit,
    soldPrice,
    soldDate,
    soldPlace,
  } = payload;

  const existingSale = await db.query.sales.findFirst({
    where: and(eq(sales.id, Number(id)), eq(sales.userId, user?.id || '')),
  });

  if (!existingSale) {
    throw new Error('Sale not found');
  }

  const profit = calculateSaleProfit(soldPrice, purchasePrice);

  try {
    return db
      .update(sales)
      .set({
        name,
        sku,
        categoryId,
        purchasePrice,
        purchaseDate: new Date(purchaseDate || new Date()),
        brand,
        size,
        sizeUnit,
        imageUrl,
        purchasePlace,
        profit,
        soldPrice,
        soldDate: new Date(soldDate || new Date()),
        soldPlace,
        updatedAt: new Date(),
        userId: user?.id || '',
      })
      .where(and(eq(sales.id, Number(id)), eq(sales.userId, user?.id || '')));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const deleteSales = async (salesIds: number[]) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    return Promise.allSettled(
      salesIds.map(async saleId => {
        await db.delete(sales).where(and(eq(sales.id, saleId), eq(sales.userId, user?.id || '')));
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const revertSale = async (saleIds: number[]) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    return Promise.allSettled(
      saleIds.map(async saleId => {
        const sale = await db.query.sales.findFirst({
          where: and(eq(sales.id, saleId), eq(sales.userId, user?.id || '')),
        });

        if (!sale) {
          throw new Error('Sale not found');
        }

        await db.transaction(async tx => {
          await tx.delete(sales).where(and(eq(sales.id, saleId), eq(sales.userId, user?.id || '')));
          await tx.insert(products).values({
            name: sale?.name || '',
            sku: sale?.sku || '',
            purchasePrice: sale?.purchasePrice || 0,
            size: sale?.size || '',
            sizeUnit: sale?.sizeUnit,
            imageUrl: sale?.imageUrl,
            brand: sale?.brand,
            categoryId: sale?.categoryId,
            purchasePlace: sale?.purchasePlace,
            purchaseDate: sale?.purchaseDate || new Date(),
            status: ProductStatus.IN_STOCK,
            updatedAt: new Date(),
            userId: user?.id || '',
          });
        });
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

// eslint-disable-next-line complexity
export const duplicateSale = async (id: number) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const sale = await db.query.sales.findFirst({
    where: and(eq(sales.id, Number(id)), eq(sales.userId, user?.id || '')),
  });

  if (!sale) {
    throw new Error('Sale not found');
  }

  try {
    return db.insert(sales).values({
      name: sale?.name || '',
      sku: sale?.sku || '',
      size: sale?.size || '',
      categoryId: sale?.categoryId || 0,
      purchasePrice: sale?.purchasePrice || 0,
      purchaseDate: new Date(sale?.purchaseDate || new Date()),
      soldPrice: sale?.soldPrice || 0,
      soldDate: new Date(sale?.soldDate || new Date()),
      soldPlace: sale?.soldPlace || '',
      profit: sale?.profit || 0,
      brand: sale?.brand || '',
      sizeUnit: sale?.sizeUnit || SizeUnit.EU,
      imageUrl: sale?.imageUrl || '',
      purchasePlace: sale?.purchasePlace || '',
      createdAt: new Date(),
      userId: user?.id || '',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};
