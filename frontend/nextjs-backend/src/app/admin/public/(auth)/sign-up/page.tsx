'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/button';
import { CUSTOM_ERROR } from '@/app/lib/constants';
import TextInput from '@/components/form/textInput';
import eyeOpenIcon from '/public/icons/eye-open.svg';
import InputError from '@/components/form/inputError';
import eyeCloseIcon from '/public/icons/eye-close.svg';
import { signUp } from '@/app/lib/actions/auth.actions';
import authLayoutStyles from '../authLayout.module.scss';
import { signUpSchema } from '@/app/lib/schemas/auth.schema';
import { iResponse, iSignUp } from '@/app/lib/interfaces/auth.interface';

export default function SignUpPage() {
  const [customError, setCustomError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      console.log({ error });
    }
  });

  return (
    <form onSubmit={submit} className={authLayoutStyles.auth_form}>
      <section className={authLayoutStyles.input_wrapper}>
        <p className={authLayoutStyles.auth_text}>Sign Up</p>
        <TextInput
          name="name"
          type="text"
          label="Full Name"
          error={errors?.name?.message}
          validation={{ ...register('name') }}
        />
        <TextInput
          name="email"
          type="email"
          label="E-mail"
          error={errors?.email?.message}
          validation={{ ...register('email') }}
        />
        <TextInput
          showIcon={true}
          name="password"
          label="Password"
          error={errors?.password?.message}
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? eyeCloseIcon : eyeOpenIcon}
          handleIconClick={() => setShowPassword(!showPassword)}
          validation={{ ...register('password') }}
        />
        {customError ? <InputError text={customError} /> : null}
        <Button text="Sign up" isSubmitting={isSubmitting} />
      </section>

      <section className={authLayoutStyles.account_text}>
        Don&apos;t have an account?
        <Link href="/admin/public/sign-in">Sign in</Link>
      </section>
    </form>
  );
}
