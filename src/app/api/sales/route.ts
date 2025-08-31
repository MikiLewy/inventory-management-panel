import { and, asc, between, desc, eq, gt, ilike, lt, or, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/server/db';
import { sales } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

const getProfitWhere = (profitPositive: boolean[]) => {
  if (profitPositive?.length === 1) {
    if (profitPositive[0] === true) {
      return gt(sales.profit, 0);
    } else if (profitPositive[0] === false) {
      return lt(sales.profit, 0);
    }
  } else if (profitPositive?.length === 2) {
    return or(gt(sales.profit, 0), lt(sales.profit, 0));
  }
  return undefined;
};

// eslint-disable-next-line complexity
export async function GET(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

  const parsedFilters: { dateRange?: { from: Date; to: Date }; profitPositive?: boolean[] } | undefined = filters
    ? JSON.parse(filters)
    : undefined;

  if (parsedFilters?.dateRange) {
    where.push(between(sales.soldDate, new Date(parsedFilters.dateRange.from), new Date(parsedFilters.dateRange.to)));
  }

  if (parsedFilters?.profitPositive && parsedFilters?.profitPositive?.length > 0) {
    where.push(getProfitWhere(parsedFilters?.profitPositive));
  }

  try {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
