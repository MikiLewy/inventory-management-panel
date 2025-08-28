import { redirect } from 'next/navigation';

import { createClient } from '@/features/auth/utils/supabase/server';
import { fetchCategories } from '@/shared/api/lib/categories';

export default async function IndexPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return redirect('/login');
  }

  await Promise.allSettled([fetchCategories()]).then(results => {
    if (results?.[0]?.status === 'fulfilled') {
      if (results?.[0]?.value.length > 0) {
        return redirect('/inventory');
      }
    }
  });

  return redirect('/no-access');
}
