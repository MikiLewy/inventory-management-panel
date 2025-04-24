import authApi from '../clients/api';

export const setNewCredential = async (token: string, password: string) => {
  await authApi.patch(`/password-reset/${token}`, {
    password,
  });
};

export const resetCredential = async (email: string) => {
  await authApi.post(`/password-reset/issue`, {
    email,
  });
};

export const fetchResetPasswordExpiration = async (
  token: string,
): Promise<boolean> => {
  const { data } = await authApi.get<boolean>(`/password-reset/${token}`);

  return data;
};
