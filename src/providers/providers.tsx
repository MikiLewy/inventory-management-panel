'use client';

import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '@/features/auth/providers/auth-providers';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <NextTopLoader />
      {children}
      <Toaster />
    </AuthProvider>
  );
};
