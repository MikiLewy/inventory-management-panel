import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { categories } from '@/server/db/schema';

export async function GET() {
  try {
    const categoriesData = await db.select().from(categories);

    return NextResponse.json(categoriesData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories', details: error }, { status: 500 });
  }
}
