export const resetPasswordExpirationKeys = {
  all: ['reset-password-expiration'],
  details: () => [...resetPasswordExpirationKeys.all, 'list'] as const,
  detail: (token: string) =>
    [...resetPasswordExpirationKeys.details(), { token }] as const,
};
