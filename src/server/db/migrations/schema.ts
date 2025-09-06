import { pgTable, integer, text, timestamp, foreignKey, real, jsonb, pgEnum } from 'drizzle-orm/pg-core';

export const categoryType = pgEnum('category_type', ['SNEAKERS', 'CLOTHING', 'COLLECTIBLES', 'ACCESSORIES', 'OTHER']);

export const sizeUnit = pgEnum('size_unit', ['EU', 'US', 'UK', 'CM']);

export const status = pgEnum('status', ['IN_STOCK', 'IN_DELIVERY']);

export const type = pgEnum('type', ['SNEAKERS', 'CLOTHING', 'COLLECTIBLES', 'ACCESSORIES', 'OTHER']);

export const warehouses = pgTable('warehouses', {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({
      name: 'warehouses_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
  name: text().notNull(),
  address: text(),
  postCode: text('post_code'),
  city: text(),
  country: text(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const sales = pgTable(
  'sales',
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: 'sales_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    name: text().notNull(),
    sku: text().notNull(),
    purchasePrice: real('purchase_price').notNull(),
    purchaseDate: timestamp('purchase_date', { mode: 'string' }),
    profit: real().notNull(),
    soldPrice: real('sold_price').notNull(),
    soldDate: timestamp('sold_date', { mode: 'string' }),
    soldPlace: text('sold_place'),
    brand: text(),
    categoryId: integer('category_id'),
    purchasePlace: text('purchase_place'),
    size: text().notNull(),
    sizeUnit: sizeUnit('size_unit').default('EU'),
    imageUrl: text('image_url').default(
      'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
    ),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
    userId: text('user_id').notNull(),
  },
  table => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'sales_category_id_categories_id_fk',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const products = pgTable(
  'products',
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: 'products_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    name: text().notNull(),
    sku: text().notNull(),
    purchasePrice: real('purchase_price').notNull(),
    purchaseDate: timestamp('purchase_date', { mode: 'string' }),
    status: status().default('IN_STOCK'),
    brand: text(),
    categoryId: integer('category_id'),
    purchasePlace: text('purchase_place'),
    size: text().notNull(),
    sizeUnit: sizeUnit('size_unit').default('EU'),
    imageUrl: text('image_url').default(
      'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
    ),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
    userId: text('user_id').notNull(),
  },
  table => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'products_category_id_categories_id_fk',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const categories = pgTable('categories', {
  id: integer().primaryKey().notNull(),
  translations: jsonb(),
  type: type().default('SNEAKERS'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const productSuggestions = pgTable('product_suggestions', {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({
      name: 'product_suggestions_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
  title: text().notNull(),
  sku: text().notNull(),
  brand: text(),
  category: categoryType().default('OTHER'),
  image: text().default('https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.webp'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
