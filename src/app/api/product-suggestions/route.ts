import { and, ilike, asc, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/server/db';
import { productSuggestions } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

export async function GET(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('search') || '';

  const where = [];

  if (search) {
    where.push(or(ilike(productSuggestions.title, `%${search}%`), ilike(productSuggestions.sku, `%${search}%`)));
  }
  try {
    const data = await db.query.productSuggestions.findMany({
      limit: 5,
      offset: 0,
      orderBy: asc(productSuggestions.createdAt),
      where: and(...where),
    });

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
