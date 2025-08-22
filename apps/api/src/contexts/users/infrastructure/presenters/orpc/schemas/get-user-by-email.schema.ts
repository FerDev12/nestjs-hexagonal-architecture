import z from 'zod';

export const GetUserByEmailSchema = z.object({
  email: z.string(),
});
