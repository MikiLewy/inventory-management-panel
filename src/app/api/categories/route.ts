import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { categories } from '@/server/db/schema';

export async function GET() {
  const categoriesData = await db.select().from(categories);

  return NextResponse.json(categoriesData);
}
