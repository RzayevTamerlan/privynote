import { z } from 'zod';

export const NotePasswordSchema = z.object({
  password: z.string().min(5, { message: 'Minimal length of password must be 5 symbols' }).max(100, { message: 'Password can\'t be longer than 100 symbols' }).regex(/[A-Za-z]/, 'Password must contain at least one letter'),
});
