import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { createClient } from '@/features/auth/utils/supabase/server';
import { db } from '@/server/db';
import { products } from '@/server/db/schema';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await db.query.products.findFirst({
    where: and(eq(products.id, Number(id)), eq(products.userId, user?.id || '')),
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

  return NextResponse.json(data);
}
