import { relations } from 'drizzle-orm';
import { jsonb, pgTable, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

import { CategoryType } from '../types/enum/category-type';

import { products } from './products';
import { sales } from './sales';

export const categoryTypeEnum = pgEnum('type', CategoryType);

export const categories = pgTable('categories', {
  id: integer('id').primaryKey(),
  translations: jsonb('translations'),
  type: categoryTypeEnum('type').default(CategoryType.SNEAKERS),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  sales: many(sales),
}));
