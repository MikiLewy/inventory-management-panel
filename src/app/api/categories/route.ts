import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { categories } from '@/server/db/schema';
import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

export async function GET() {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const categoriesData = await db.select().from(categories);

    return NextResponse.json(categoriesData);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
