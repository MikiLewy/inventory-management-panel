import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, real } from 'drizzle-orm/pg-core';

import { SizeUnit } from '../types/enum/size-unit';

import { categories } from './categories';
import { sizeUnitEnum } from './products';

export const sales = pgTable('sales', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  sku: text('sku').notNull(),
  purchasePrice: real('purchase_price').notNull(),
  purchaseDate: timestamp('purchase_date'),
  profit: real('profit').notNull(),
  soldPrice: real('sold_price').notNull(),
  soldDate: timestamp('sold_date'),
  soldPlace: text('sold_place'),
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
});

export const salesRelations = relations(sales, ({ one }) => ({
  category: one(categories, {
    fields: [sales.categoryId],
    references: [categories.id],
  }),
}));
