import { and, ilike, asc, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/server/db';
import { productSuggestions } from '@/server/db/schema';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('search') || '';

  const where = [];

  if (search) {
    where.push(or(ilike(productSuggestions.title, `%${search}%`), ilike(productSuggestions.sku, `%${search}%`)));
  }

  const data = await db.query.productSuggestions.findMany({
    limit: 5,
    offset: 0,
    orderBy: asc(productSuggestions.createdAt),
    where: and(...where),
  });

  return NextResponse.json(data);
}
