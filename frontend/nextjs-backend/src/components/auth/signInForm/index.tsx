import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import Button from '@/components/ui/button';
import authStyles from '../auth.module.scss';
import InputError from '../../ui/form/inputError';
import eyeOpenIcon from '/public/icons/eye-open.svg';
import TextInput from '@/components/ui/form/textInput';
import eyeCloseIcon from '/public/icons/eye-close.svg';
import { iResponse } from '@/lib/interfaces/auth.interface';

export default function SignInForm({ errorMessage }: { errorMessage: iResponse | void }) {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={authStyles.auth_form}>
      <section className={authStyles.input_wrapper}>
        <p className={authStyles.auth_text}>Sign In</p>
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
      <Link href="/admin/public/forgot-password" className={authStyles.forgot_password}>
        Forgot password?
      </Link>
      {errorMessage?.errors?.[0]?.message ? (
        <InputError
          margin="-16px 0 4px 0"
          data_testid="signin-error"
          text={errorMessage.errors[0].message}
        />
      ) : null}
      <Button text="Sign in" isSubmitting={pending} />

      <section className={authStyles.account_text}>
        Don&apos;t have an account?
        <Link href="/admin/public/sign-up">Sign up</Link>
      </section>
    </div>
  );
}
