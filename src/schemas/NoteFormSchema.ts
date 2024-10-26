import { z } from 'zod';

export const NoteFormSchema = z.object({
  content: z
    .string()
    .min(3, { message: 'Content must contain at least 3 characters' })
    .max(10000, { message: 'Content can\'t contain more than 10,000 characters' }),
  isPrivate: z.boolean(),
  password: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isPrivate) {
    if (!data.password) {
      ctx.addIssue({
        path: ["password"],
        message: "Password is required for private notes",
        code: z.ZodIssueCode.custom,
      });
    } else if (data.password.length < 5) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must be at least 5 characters long",
        code: z.ZodIssueCode.custom,
      });
    } else if (!/[A-Za-z]/.test(data.password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must contain at least one letter",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});
