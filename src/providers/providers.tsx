'use client';

import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/organisms/theme-provider';
import { AuthProvider } from '@/features/auth/providers/auth-providers';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <NextTopLoader />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  );
};
