import { InternalAxiosRequestConfig } from 'axios';

import { authStoreOutsideComponent } from '@/features/auth/providers/auth-providers';

export const attachAccessToken = async (config: InternalAxiosRequestConfig) => {
  const { session } = authStoreOutsideComponent();

  if (session) {
    config.headers['Authorization'] = `Bearer ${session?.access_token}`;
  }

  return config;
};
