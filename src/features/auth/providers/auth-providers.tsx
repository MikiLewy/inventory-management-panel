'use client';

import { Session, User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';

import supabase from '@/features/auth/utils/supabase/client';

export interface AuthState {
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export const authStore = createStore<AuthState>(set => ({
  session: null,
  loading: true,
  setSession: session => {
    set({ session });
  },
  setLoading: loading => {
    set({ loading });
  },
}));

const AuthContext = createContext<StoreApi<AuthState> | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authStoreSetLoading = useStore(authStore, state => state.setLoading);
  const authStoreSetSession = useStore(authStore, state => state.setSession);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      authStoreSetSession(session);
      authStoreSetLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authStoreSetSession(session);
    });

    return subscription.unsubscribe;
  }, [authStoreSetLoading, authStoreSetSession, pathname]);

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
};

export const authStoreOutsideComponent = () => {
  return authStore.getState();
};

export const useAuthOutsideContext = () => {
  const store = useStore(authStore);

  return store;
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth has to be used inside AuthProvider');
  }

  const store = useStore(context);

  return store;
};

export const useUser = (): User | null => {
  const state = useAuth();

  return state.session?.user ?? null;
};
