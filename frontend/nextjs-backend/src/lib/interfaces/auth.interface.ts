import { z, ZodIssue } from 'zod';
import { signUpSchema } from '../schemas/auth.schema';

export interface iSignIn {
  email: string;
  password: string;
}

export type iSignUp = z.infer<typeof signUpSchema>;

type ExtendedZodIssue = Omit<ZodIssue, 'path'> & {
  path: (string | number)[];
};
export type izodResponse = Pick<ExtendedZodIssue, 'message' | 'path'>[];
export interface iResponse {
  errors: izodResponse;
}
