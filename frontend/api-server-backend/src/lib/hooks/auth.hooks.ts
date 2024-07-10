import { useRouter } from 'next/navigation';

import { setLocalStorage } from '../helper';
import { ASTRAASAN_DATA } from '../constants';
import { signinUser, signupUser } from '@/lib/utils/api-requests';
import { iAuthResponse, iSignIn, iSignUp } from '../interfaces/auth.interface';

export default function useAuth() {
  const router = useRouter();

  const signUp = async (data: iSignUp) => {
    const response: iAuthResponse = await signupUser(data);

    await setLocalStorage({ name: ASTRAASAN_DATA, data: JSON.stringify(response) });

    router.push('/admin/dashboard');
  };

  const signIn = async (data: iSignIn) => {
    const response: iAuthResponse = await signinUser(data);

    await setLocalStorage({ name: ASTRAASAN_DATA, data: JSON.stringify(response) });

    router.push('/admin/dashboard');
  };

  return { signUp, signIn };
}
