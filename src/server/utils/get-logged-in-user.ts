'use server';
'server-only';

import { createClient } from '@/features/auth/utils/supabase/server';

export const getLoggedInUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
