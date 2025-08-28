import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { CategoryType } from '../types/enum/category-type';

import { categoryTypeEnum } from './categories';

export const productSuggestions = pgTable('product_suggestions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  sku: text('sku').notNull(),
  brand: text('brand'),
  category: categoryTypeEnum('category').default(CategoryType.OTHER),
  image: text('image').default(
    'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
  ),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
