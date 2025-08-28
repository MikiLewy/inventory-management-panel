'use server';
'server-only';

import { db } from '@/server/db';
import { categories } from '@/server/db/schema';

export const getCategories = async () => {
  return db.select().from(categories);
};
