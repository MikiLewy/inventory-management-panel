import { redirect } from 'next/navigation';

import api from '@/api/clients/api';
import { createClient } from '@/features/auth/utils/supabase/server';

export default async function IndexPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();

  const { data: sessionData } = await supabase.auth.getSession();

  if (!userData?.user) {
    return redirect('/login');
  }

  api.defaults.headers.common.Authorization = `Bearer ${sessionData?.session?.access_token}`;

  // TODO: REPLACE WITH DIFFERENT API CALL WHEN API WILL BE READY
  const data = await Promise.allSettled([api.post('/verify')]);

  if (data?.[0]?.status === 'fulfilled') {
    if (data?.[0]?.value?.status === 200) {
      return redirect('/inventory');
    }
  }

  return redirect('/no-access');
}
