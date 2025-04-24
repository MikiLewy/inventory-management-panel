import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { authRoutes } from '@/constants/auth-routes';
import { createClient } from '@/features/auth/utils/supabase/middleware';

import { CustomMiddleware } from './custom-middleware';

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { supabase, response } = await createClient(request);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && !authRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/en/login', request.url));
    }

    return middleware(request, event, response);
  };
}
