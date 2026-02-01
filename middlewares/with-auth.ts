import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { publicRoutes } from '@/constants/public-routes';
import { createClient } from '@/features/auth/utils/supabase/middleware';
import { getCurrentLocale } from '@/locales/server';

import { CustomMiddleware } from './custom-middleware';

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { supabase, response } = await createClient(request);

    const locale = await getCurrentLocale();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && !publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    if (user && request.nextUrl.pathname === `/${locale}/login`) {
      return NextResponse.redirect(new URL(`/${locale}/statistics`, request.url));
    }

    return middleware(request, event, response);
  };
}
