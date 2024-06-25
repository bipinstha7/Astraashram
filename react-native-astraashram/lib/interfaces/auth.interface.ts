import { z, ZodIssue } from 'zod';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';

export type iSignIn = z.infer<typeof signInSchema>;
export type iSignUp = z.infer<typeof signUpSchema>;

// type ExtendedZodIssue = Omit<ZodIssue, 'path'> & {
//   path: (string | number)[];
// };

// export type izodResponse = Pick<ExtendedZodIssue, 'message' | 'path'>[];
// export interface iResponse {
//   errors: izodResponse;
// }

export interface iAuthResponse {
  name: string;
  email: string;
  token: string;
}

export interface iSigninPayload {
  email: string;
  password: string;
}
export interface iSignupPayload extends iSigninPayload {
  name: string;
}
