import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 100;

export const NotePasswordSchema = z.object({
  password: z.string().min(MIN_PASSWORD_LENGTH, { message: 'Minimal length of password must be 5 symbols' }).max(MAX_PASSWORD_LENGTH, { message: 'Password can\'t be longer than 100 symbols' }).regex(/[A-Za-z]/, 'Password must contain at least one letter'),
});
