import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { warehouses } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

export async function GET() {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await db
      .select()
      .from(warehouses)
      .where(eq(warehouses.userId, user?.id || ''))
      .orderBy(desc(warehouses.updatedAt));

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
