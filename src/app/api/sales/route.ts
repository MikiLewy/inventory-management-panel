import { and, asc, between, desc, eq, ilike, or, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/features/auth/utils/supabase/server';
import { db } from '@/server/db';
import { sales } from '@/server/db/schema';

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const searchParams = request.nextUrl.searchParams;

  const offset = searchParams.get('offset') || 0;
  const limit = searchParams.get('limit') || 10;
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const filters = searchParams.get('filters') || '';

  const where = [];

  if (search) {
    where.push(or(ilike(sales.name, `%${search}%`), ilike(sales.sku, `%${search}%`)));
  }

  const parsedFilters: { dateRange?: { from: Date; to: Date } } | undefined = filters ? JSON.parse(filters) : undefined;

  if (parsedFilters?.dateRange) {
    where.push(between(sales.soldDate, new Date(parsedFilters.dateRange.from), new Date(parsedFilters.dateRange.to)));
  }

  const data = await db.query.sales.findMany({
    extras: {
      total: db.$count(sales, and(...where, eq(sales.userId, user?.id || ''))).as('total'),
    },
    limit: Number(limit),
    offset: Number(offset),
    orderBy:
      sortBy && sortOrder
        ? sortOrder === 'asc'
          ? asc(sql.identifier(sortBy))
          : desc(sql.identifier(sortBy))
        : undefined,
    where: and(...where, eq(sales.userId, user?.id || '')),
    with: {
      category: {
        columns: {
          id: true,
          translations: true,
          type: true,
        },
      },
    },
  });

  return NextResponse.json({
    resources: data,
    total: data?.[0]?.total,
  });
}
