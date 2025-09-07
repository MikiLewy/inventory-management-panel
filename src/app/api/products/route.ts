import { and, asc, between, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/server/db';
import { products } from '@/server/db/schema';
import { ProductStatus } from '@/server/db/types/enum/product-status';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

const getStatusWhere = (status: ProductStatus[]) => {
  if (status.includes(ProductStatus.IN_STOCK) || status.includes(ProductStatus.IN_DELIVERY)) {
    return inArray(products.status, status);
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
    where.push(or(ilike(products.name, `%${search}%`), ilike(products.sku, `%${search}%`)));
  }

  const parsedFilters:
    | { status?: ProductStatus[]; warehouse?: string[]; dateRange?: { from: string; to: string } }
    | undefined = filters ? JSON.parse(filters) : undefined;

  if (parsedFilters?.status && parsedFilters?.status?.length > 0) {
    where.push(getStatusWhere(parsedFilters.status));
  }

  if (parsedFilters?.dateRange) {
    where.push(
      between(products.purchaseDate, new Date(parsedFilters.dateRange.from), new Date(parsedFilters.dateRange.to)),
    );
  }

  if (parsedFilters?.warehouse && parsedFilters?.warehouse?.length > 0) {
    where.push(inArray(products.warehouseId, parsedFilters.warehouse.map(Number)));
  }

  try {
    const data = await db.query.products.findMany({
      extras: {
        total: db.$count(products, and(...where, eq(products.userId, user?.id || ''))).as('total'),
      },
      limit: Number(limit),
      offset: Number(offset),
      orderBy:
        sortBy && sortOrder
          ? sortOrder === 'asc'
            ? asc(sql.identifier(sortBy))
            : desc(sql.identifier(sortBy))
          : undefined,
      where: and(...where, eq(products.userId, user?.id || '')),
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
