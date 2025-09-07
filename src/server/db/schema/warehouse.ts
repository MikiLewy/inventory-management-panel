import { relations } from 'drizzle-orm';
import { pgTable, timestamp, integer, text } from 'drizzle-orm/pg-core';

import { products } from './products';

export const warehouses = pgTable('warehouses', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  address: text('address'),
  postCode: text('post_code'),
  city: text('city'),
  country: text('country'),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  products: many(products),
}));
