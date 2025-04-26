import { z } from 'zod';

export const useLoginSchema = () => {
  return z.object({
    email: z.string().email(),
    password: z.string(),
  });
};
