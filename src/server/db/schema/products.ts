import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, pgEnum, real } from 'drizzle-orm/pg-core';

import { ProductStatus } from '../types/enum/product-status';
import { SizeUnit } from '../types/enum/size-unit';

import { categories } from './categories';
import { warehouses } from './warehouse';

export const productStatusEnum = pgEnum('status', ProductStatus);

export const sizeUnitEnum = pgEnum('size_unit', SizeUnit);

export const products = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  sku: text('sku').notNull(),
  purchasePrice: real('purchase_price').notNull(),
  purchaseDate: timestamp('purchase_date'),
  status: productStatusEnum('status').default(ProductStatus.IN_STOCK),
  brand: text('brand'),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  purchasePlace: text('purchase_place'),
  size: text('size').notNull(),
  sizeUnit: sizeUnitEnum('size_unit').default(SizeUnit.EU),
  imageUrl: text('image_url').default(
    'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
  ),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: text('user_id').notNull(),
  warehouseId: integer('warehouse_id')
    .default(1)
    .references(() => warehouses.id, { onDelete: 'set null', onUpdate: 'cascade' }),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  warehouse: one(warehouses, {
    fields: [products.warehouseId],
    references: [warehouses.id],
  }),
}));
