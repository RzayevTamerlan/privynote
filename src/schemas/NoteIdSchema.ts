import { z } from 'zod';

const ID_LENGTH = 10;

export const NoteIdSchema = z.object({
  id: z.string().min(ID_LENGTH).max(ID_LENGTH),
});