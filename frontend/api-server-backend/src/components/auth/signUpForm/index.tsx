import Link from 'next/link';
import { useState } from 'react';

import Button from '@/components/ui/button';
import authStyles from '../auth.module.scss';
import TextInput from '../../ui/form/textInput';
import InputError from '../../ui/form/inputError';
import { iAuthFormProps } from '../auth.interface';
import eyeOpenIcon from '/public/icons/eye-open.svg';
import eyeCloseIcon from '/public/icons/eye-close.svg';
import { iSignUp } from '@/lib/interfaces/auth.interface';

export default function SignUpForm(props: iAuthFormProps<iSignUp>) {
  const { errors, register, customError, isSubmitting } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={authStyles.auth_form}>
      <section className={authStyles.input_wrapper}>
        <p className={authStyles.auth_text}>Sign Up</p>
        <TextInput
          name="name"
          type="text"
          label="Full Name"
          error={errors?.name?.message as string}
          validation={{ ...register('name') }}
        />
        <TextInput
          name="email"
          type="email"
          label="E-mail"
          error={errors?.email?.message as string}
          validation={{ ...register('email') }}
        />
        <TextInput
          showIcon={true}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={errors?.password?.message as string}
          icon={showPassword ? eyeCloseIcon : eyeOpenIcon}
          handleIconClick={() => setShowPassword(!showPassword)}
          validation={{ ...register('password') }}
        />
        {customError ? <InputError text={customError} /> : null}
        <Button text="Sign up" isSubmitting={isSubmitting} />
      </section>

      <section className={authStyles.account_text}>
        Already have an account?
        <Link href="/admin/public/sign-in">Sign in</Link>
      </section>
    </div>
  );
}
