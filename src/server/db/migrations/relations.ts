import { relations } from 'drizzle-orm/relations';

import { categories, sales, products } from './schema';

export const salesRelations = relations(sales, ({ one }) => ({
  category: one(categories, {
    fields: [sales.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  sales: many(sales),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
