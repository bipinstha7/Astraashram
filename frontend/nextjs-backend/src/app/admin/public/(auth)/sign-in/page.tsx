'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';

import Button from '@/components/button';
import styles from './sign-in.module.scss';
import TextInput from '@/components/form/textInput';
import eyeOpenIcon from '/public/icons/eye-open.svg';
import InputError from '@/components/form/inputError';
import eyeCloseIcon from '/public/icons/eye-close.svg';
import { signIn } from '@/app/lib/actions/auth.actions';
import authLayoutStyles from '../authLayout.module.scss';
import { iResponse } from '@/app/lib/interfaces/auth.interface';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, dispatch] = useFormState<iResponse | void, FormData>(signIn, undefined);

  console.dir({ errorMessage }, { depth: null });

  return (
    <form action={dispatch} className={authLayoutStyles.auth_form}>
      <section className={authLayoutStyles.input_wrapper}>
        <p className={authLayoutStyles.auth_text}>Sign In</p>
        <TextInput name="email" type="email" label="E-mail" />
        <TextInput
          showIcon={true}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? eyeCloseIcon : eyeOpenIcon}
          handleIconClick={() => setShowPassword(!showPassword)}
        />
      </section>
      <Link href="/admin/public/forgot-password" className={styles.forgot_password}>
        Forgot password?
      </Link>
      {errorMessage?.errors?.[0]?.message ? (
        <InputError text={errorMessage.errors[0].message} margin="-16px 0 4px 0" />
      ) : null}
      <Button text="Sign in" useFormStatusPending />

      <section className={authLayoutStyles.account_text}>
        Don&apos;t have an account?
        <Link href="/admin/public/sign-up">Sign up</Link>
      </section>
    </form>
  );
}
