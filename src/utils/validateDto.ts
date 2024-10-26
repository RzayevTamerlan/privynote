import { ZodError } from 'zod';
import { ActionResponse } from '@/types/ActionResponse';

interface Validatable<T> {
  new (dto: T): T; // Enforce constructor signature
  validate(dto: T): T; // Static validation method
}

export const validateDto = <T>(validatorClass: Validatable<T>, dto: T): ActionResponse<T> => {
  try {
    // Call the static validate method
    const validatedDto = validatorClass.validate(dto);
    return { error: null, data: validatedDto };
  } catch (e) {
    if (e instanceof ZodError) {
      return { error: { statusCode: 500, message: e.message }, data: null };
    } else {
      return { error: { statusCode: 500, message: 'An error occurred' }, data: null };
    }
  }
};
