import { z } from 'zod';

export const NoteIdSchema = z.object({
  id: z.string().min(10).max(10),
});