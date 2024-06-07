'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUp } from '@/app/lib/actions/auth.actions';
import SignUpForm from '@/components/form/auth/signUpForm';
import { signUpSchema } from '@/app/lib/schemas/auth.schema';
import { CUSTOM_ERROR, SOMETHING_WENT_WRONG } from '@/app/lib/constants';
import { iResponse, iSignUp } from '@/app/lib/interfaces/auth.interface';

export default function SignUpPage() {
  const [customError, setCustomError] = useState('');
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<iSignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const submit = handleSubmit(async data => {
    try {
      setCustomError('');
      const response: iResponse = await signUp(null, data);

      if (response.errors?.length) {
        response.errors.map(error => {
          const path = error.path[0] as keyof iSignUp | typeof CUSTOM_ERROR;

          if (path === CUSTOM_ERROR) return setCustomError(error.message);

          setError(path, { type: 'custom', message: error.message });
        });
      }
    } catch (error) {
      console.log({ signUpFormSubmitError: error });
      setCustomError(SOMETHING_WENT_WRONG);
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
