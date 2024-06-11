'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useAuth from '@/app/lib/hooks/auth.hooks';
import SignUpForm from '@/components/form/auth/signUpForm';
import { VALIDATION_EXCEPTION } from '@/app/lib/constants';
import { signUpSchema } from '@/app/lib/schemas/auth.schema';
import { iSignUp } from '@/app/lib/interfaces/auth.interface';
import { iApiValidationError } from '@/utils/api-requests.interface';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<iSignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const [customError, setCustomError] = useState('');

  const submit = handleSubmit(async data => {
    try {
      setCustomError('');
      await signUp(data);
    } catch (error: any) {
      console.log({ signUpFormSubmitError: error });
      if (error.error === VALIDATION_EXCEPTION) {
        const err: iApiValidationError = error;
        err.message.map(e =>
          setError(e.property as keyof iSignUp, { type: 'custom', message: e.message })
        );
      } else {
        setCustomError(error.message);
      }
    }
  });

  return (
    <form onSubmit={submit}>
      <SignUpForm
        errors={errors}
        register={register}
        customError={customError}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
