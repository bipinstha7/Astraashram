'use client';

import { useFormState } from 'react-dom';

import { signIn } from '@/app/lib/actions/auth.actions';
import { iResponse } from '@/app/lib/interfaces/auth.interface';
import SignInForm from '@/components/form/auth/signInForm';

export default function SignInPage() {
  const [errorMessage, dispatch] = useFormState<iResponse | void, FormData>(signIn, undefined);

  return (
    <form action={dispatch}>
      <SignInForm errorMessage={errorMessage} />
    </form>
  );
}
