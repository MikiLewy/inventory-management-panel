import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { warehouses } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await db.query.warehouses.findFirst({
      where: and(eq(warehouses.userId, user?.id || ''), eq(warehouses.id, Number(id))),
    });

    if (!data) {
      return NextResponse.json({ error: 'Warehouse not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
