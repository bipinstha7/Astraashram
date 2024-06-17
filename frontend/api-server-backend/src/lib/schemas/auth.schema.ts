import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().trim().min(1, { message: 'Password is required' }),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: 'Name must be at least 5 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .min(8, { message: 'Email must be at least 8 characters' }),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!.%*#?&])[A-Za-z\d@$!.%*#?&]{8,}$/, {
      message:
        'Must be at least 8 Characters with uppercase, lowercase, number and special characters',
    }),
});
