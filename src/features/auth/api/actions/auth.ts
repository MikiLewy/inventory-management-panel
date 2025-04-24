'use server';

import { redirect } from 'next/navigation';

import { createClient } from '../../utils/supabase/server';
import { ServerActionErrorResponse } from '../types/server-action-error-response';

export const logout = async (): Promise<void | ServerActionErrorResponse> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const response = await supabase.auth.signOut();

    if (response.error) {
      return {
        error: response.error.message,
      };
    }

    redirect(`/login`);
  }
};

export const login = async (email: string, password: string): Promise<string | ServerActionErrorResponse> => {
  const supabase = await createClient();

  const response = await supabase.auth.signInWithPassword({ email, password });

  if (response.error) {
    return {
      error: response.error.message,
    };
  }

  return response.data.session.access_token;
};

export const signUp = async (email: string, password: string): Promise<string | ServerActionErrorResponse> => {
  const supabase = await createClient();

  const response = await supabase.auth.signUp({ email, password });

  if (response.error) {
    return {
      error: response.error.message,
    };
  }

  return response.data.session?.access_token || '';
};

export const updatePassword = async (password: string): Promise<void | ServerActionErrorResponse> => {
  const supabase = await createClient();

  const response = await supabase.auth.updateUser({ password });

  if (response.error) {
    return {
      error: response.error.message,
    };
  }
};
