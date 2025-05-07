import { redirect } from 'next/navigation';

import api from '@/api/clients/api';
import { createClient } from '@/features/auth/utils/supabase/server';
import { fetchCategories } from '@/shared/api/lib/categories';

export default async function IndexPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();

  const { data: sessionData } = await supabase.auth.getSession();

  if (!userData?.user) {
    return redirect('/login');
  }

  api.defaults.headers.common.Authorization = `Bearer ${sessionData?.session?.access_token}`;

  await Promise.allSettled([fetchCategories(true)]).then(results => {
    if (results?.[0]?.status === 'fulfilled') {
      if (results?.[0]?.value.length > 0) {
        return redirect('/inventory');
      }
    }
  });

  return redirect('/no-access');
}
