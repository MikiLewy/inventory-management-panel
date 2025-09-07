'use server';
'server-only';

import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { products, warehouses } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

import { CreateWarehousePayload } from '../../types/payload/create-warehouse';

export const createWarehouse = async (payload: CreateWarehousePayload) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { name, address, postCode, city, country } = payload;

  try {
    return db.insert(warehouses).values({
      name,
      address,
      postCode,
      city,
      country,
      createdAt: new Date(),
      userId: user?.id || '',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const updateWarehouse = async (id: number, payload: CreateWarehousePayload) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { name, address, postCode, city, country } = payload;

  const existingWarehouse = await db.query.warehouses.findFirst({
    where: and(eq(warehouses.id, Number(id)), eq(warehouses.userId, user?.id || '')),
  });

  if (!existingWarehouse) {
    throw new Error('Sale not found');
  }

  try {
    return db
      .update(warehouses)
      .set({
        name,
        address,
        postCode,
        city,
        country,
        updatedAt: new Date(),
        userId: user?.id || '',
      })
      .where(and(eq(warehouses.id, Number(id)), eq(warehouses.userId, user?.id || '')));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const deleteWarehouse = async (warehouseId: number, warehouseIdToMoveProducts: number | undefined) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    if (warehouseIdToMoveProducts) {
      return db.transaction(async tx => {
        await tx
          .update(products)
          .set({ warehouseId: warehouseIdToMoveProducts })
          .where(and(eq(products.warehouseId, warehouseId), eq(products.userId, user?.id || '')));
        await tx.delete(warehouses).where(and(eq(warehouses.id, warehouseId), eq(warehouses.userId, user?.id || '')));
      });
    } else {
      return db.delete(warehouses).where(and(eq(warehouses.id, warehouseId), eq(warehouses.userId, user?.id || '')));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};
