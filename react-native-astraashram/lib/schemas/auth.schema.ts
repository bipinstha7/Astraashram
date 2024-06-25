import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string({ message: 'Email is required' }).trim().toLowerCase().email(),
  password: z.string({ message: 'Password is required' }).trim().min(1),
});

export const signUpSchema = z.object({
  name: z
    .string({ message: 'Full Name is required' })
    .trim()
    .min(5, { message: 'Name must be at least 5 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  email: z
    .string({ message: 'Email is required' })
    .trim()
    .toLowerCase()
    .email()
    .min(8, { message: 'Email must be at least 8 characters' }),
  password: z
    .string({ message: 'Password is required' })
    .trim()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!.%*#?&])[A-Za-z\d@$!.%*#?&]{8,}$/, {
      message:
        'Must be at least 8 Characters with uppercase, lowercase, number and special characters',
    }),
});
