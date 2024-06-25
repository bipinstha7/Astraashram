import Link from 'next/link';
import { useState } from 'react';

import TextInput from '../../textInput';
import Button from '@/components/button';
import InputError from '../../inputError';
import authStyles from '../auth.module.scss';
import { iAuthFormProps } from '../auth.interface';
import eyeOpenIcon from '/public/icons/eye-open.svg';
import eyeCloseIcon from '/public/icons/eye-close.svg';
import { iSignIn } from '@/lib/interfaces/auth.interface';

export default function SignInForm(props: iAuthFormProps<iSignIn>) {
  const { errors, isSubmitting, register, customError } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={authStyles.auth_form}>
      <section className={authStyles.input_wrapper}>
        <p className={authStyles.auth_text}>Sign In</p>
        <TextInput
          name="email"
          type="email"
          label="E-mail"
          validation={{ ...register('email') }}
          error={errors?.email?.message as string}
        />
        <TextInput
          showIcon={true}
          name="password"
          label="Password"
          validation={{ ...register('password') }}
          type={showPassword ? 'text' : 'password'}
          error={errors?.password?.message as string}
          icon={showPassword ? eyeCloseIcon : eyeOpenIcon}
          handleIconClick={() => setShowPassword(!showPassword)}
        />
      </section>
      <Link href="/admin/public/forgot-password" className={authStyles.forgot_password}>
        Forgot Password?
      </Link>
      {customError ? (
        <InputError text={customError} margin="-16px 0 4px 0" data_testid="signin-error" />
      ) : null}
      <Button text="Sign in" isSubmitting={isSubmitting} />

      <section className={authStyles.account_text}>
        Don&apos;t have an account?
        <Link href="/admin/public/sign-up">Sign up</Link>
      </section>
    </div>
  );
}
