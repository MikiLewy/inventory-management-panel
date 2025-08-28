'use server';

import { and, asc, ilike, or } from 'drizzle-orm';

import { db } from '@/server/db';
import { productSuggestions } from '@/server/db/schema/product-suggestions';

export const getProductSuggestions = async (search: string) => {
  const where = [];

  if (search) {
    where.push(or(ilike(productSuggestions.title, `%${search}%`), ilike(productSuggestions.sku, `%${search}%`)));
  }

  return db.query.productSuggestions.findMany({
    limit: 5,
    offset: 0,
    orderBy: asc(productSuggestions.createdAt),
    where: and(...where),
  });
};
