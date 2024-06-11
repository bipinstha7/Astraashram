'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useAuth from '@/app/lib/hooks/auth.hooks';
import SignInForm from '@/components/form/auth/signInForm';
import { VALIDATION_EXCEPTION } from '@/app/lib/constants';
import { signInSchema } from '@/app/lib/schemas/auth.schema';
import { iSignIn } from '@/app/lib/interfaces/auth.interface';
import { iApiValidationError } from '@/utils/api-requests.interface';

export default function SignInPage() {
  const { signIn } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<iSignIn>({
    resolver: zodResolver(signInSchema),
  });
  const [customError, setCustomError] = useState('');

  const submitForm = handleSubmit(async data => {
    try {
      setCustomError('');
      await signIn(data);
    } catch (error: any) {
      console.log({ signInSubmitFormError: error });

      if (error.error === VALIDATION_EXCEPTION) {
        const err: iApiValidationError = error;
        err.message.map(e =>
          setError(e.property as keyof iSignIn, { type: 'custom', message: e.message })
        );
      } else {
        setCustomError(error.message);
      }
    }
  });

  return (
    <form onSubmit={submitForm}>
      <SignInForm
        errors={errors}
        register={register}
        customError={customError}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
