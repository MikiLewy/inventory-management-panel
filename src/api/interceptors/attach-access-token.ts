import { InternalAxiosRequestConfig } from 'axios';

import supabase from '@/features/auth/utils/supabase/client';

export const attachAccessToken = async (config: InternalAxiosRequestConfig) => {
  if (config.skipAttachAccessToken) {
    return config;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    config.headers['Authorization'] = `Bearer ${session?.access_token}`;
  }

  return config;
};
