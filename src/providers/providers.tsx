'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '@/features/auth/providers/auth-providers';
import { ThemeProvider } from '@/providers/theme-provider';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NextTopLoader />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};
