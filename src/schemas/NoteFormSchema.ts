import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;
const MIN_CONTENT_LENGTH = 100;

export const NoteFormSchema = z.object({
  content: z
    .string()
    .min(MIN_CONTENT_LENGTH, { message: 'Content must contain at least 3 characters' })
    .max(MAX_CONTENT_LENGTH, { message: 'Content can\'t contain more than 10,000 characters' }),
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
    } else if (data.password.length < MIN_PASSWORD_LENGTH) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must be at least 5 characters long",
        code: z.ZodIssueCode.custom,
      });
    }
    else if (data.password.length > MAX_PASSWORD_LENGTH) {
      ctx.addIssue({
        path: ["password"],
        message: "Password can't be longer than 100 characters",
        code: z.ZodIssueCode.custom,
      })
    }
    else if (!/[A-Za-z]/.test(data.password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must contain at least one letter",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});
