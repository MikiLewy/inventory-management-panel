'use server';
import 'server-only';

import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { products, sales } from '@/server/db/schema';
import { ProductStatus } from '@/server/db/types/enum/product-status';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';
import { SizeUnit } from '@/types/enum/size-unit';

import { CreateProductPayload } from '../../types/payload/create-product';
import { MarkProductsAsSoldPayload } from '../../types/payload/mark-products-as-sold';
import { UpdateProductPayload } from '../../types/payload/update-product';

export const createProduct = async (payload: CreateProductPayload) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { name, sku, categoryId, products: createdProducts, status, brand, sizeUnit, imageUrl } = payload;

  const mappedProducts = createdProducts.reduce(
    (acc, product) => {
      for (let i = 0; i < product.quantity; i++) {
        acc.push(product);
      }

      return acc;
    },
    [] as {
      size: string;
      purchasePrice: number;
      purchasePlace?: string;
      purchaseDate?: string;
    }[],
  );
  try {
    return Promise.allSettled(
      mappedProducts.map(async product => {
        await db.insert(products).values({
          name,
          sku,
          size: product.size,
          categoryId,
          purchasePrice: product.purchasePrice,
          purchaseDate: new Date(product.purchaseDate || new Date()),
          status,
          brand,
          sizeUnit,
          imageUrl,
          purchasePlace: product.purchasePlace,
          createdAt: new Date(),
          userId: user?.id || '',
        });
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const updateProduct = async (id: number, payload: UpdateProductPayload) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { name, sku, categoryId, purchasePrice, size, purchaseDate, purchasePlace, status, brand, imageUrl, sizeUnit } =
    payload;

  const existingProduct = await db.query.products.findFirst({
    where: eq(products.id, Number(id)),
  });

  if (!existingProduct) {
    throw new Error('Product not found');
  }

  try {
    return db
      .update(products)
      .set({
        name,
        sku,
        categoryId,
        purchasePrice,
        purchaseDate: new Date(purchaseDate || new Date()),
        status,
        brand,
        size,
        sizeUnit,
        imageUrl,
        purchasePlace,
        updatedAt: new Date(),
      })
      .where(and(eq(products.id, Number(id)), eq(products.userId, user?.id || '')));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const deleteProducts = async (productsIds: number[]) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    return Promise.allSettled(
      productsIds.map(async productId => {
        await db.delete(products).where(and(eq(products.id, productId), eq(products.userId, user?.id || '')));
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const markAsSold = async (productsToMarkAsSold: MarkProductsAsSoldPayload[]) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    return Promise.allSettled(
      productsToMarkAsSold.map(async product => {
        const foundProduct = await db.query.products.findFirst({
          where: and(eq(products.id, Number(product.id)), eq(products.userId, user?.id || '')),
        });

        if (!foundProduct) {
          throw new Error('Product not found');
        }

        const profit = product.soldPrice - (foundProduct?.purchasePrice || 0);

        return await db.transaction(async tx => {
          await tx.insert(sales).values({
            name: foundProduct?.name || '',
            sku: foundProduct?.sku || '',
            purchasePrice: foundProduct?.purchasePrice || 0,
            size: foundProduct?.size || '',
            profit,
            sizeUnit: foundProduct?.sizeUnit,
            imageUrl: foundProduct?.imageUrl,
            brand: foundProduct?.brand,
            categoryId: foundProduct?.categoryId,
            purchasePlace: foundProduct?.purchasePlace,
            purchaseDate: foundProduct?.purchaseDate || new Date(),
            soldPrice: product.soldPrice,
            soldDate: new Date(product.soldDate || new Date()),
            soldPlace: product.soldPlace,
            userId: user?.id || '',
          });
          await tx
            .delete(products)
            .where(and(eq(products.id, Number(product.id)), eq(products.userId, user?.id || '')));
        });
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};

export const duplicateProduct = async (id: number) => {
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const product = await db.query.products.findFirst({
    where: and(eq(products.id, Number(id)), eq(products.userId, user?.id || '')),
  });

  if (!product) {
    throw new Error('Product not found');
  }

  try {
    return db.insert(products).values({
      name: product?.name || '',
      sku: product?.sku || '',
      size: product?.size || '',
      categoryId: product?.categoryId || 0,
      purchasePrice: product?.purchasePrice || 0,
      purchaseDate: new Date(product?.purchaseDate || new Date()),
      status: product?.status || ProductStatus.IN_STOCK,
      brand: product?.brand || '',
      sizeUnit: product?.sizeUnit || SizeUnit.EU,
      imageUrl: product?.imageUrl || '',
      purchasePlace: product?.purchasePlace,
      createdAt: new Date(),
      userId: user?.id || '',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    throw new Error(message);
  }
};
