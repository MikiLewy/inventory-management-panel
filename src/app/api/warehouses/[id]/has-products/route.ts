import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { products } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await db.query.products.findMany({
      where: and(eq(products.warehouseId, Number(id)), eq(products.userId, user?.id || '')),
    });

    const hasProducts = data?.length > 0;

    return NextResponse.json(hasProducts);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
