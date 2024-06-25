import { useRouter } from 'expo-router';

import useStore from './useStore';
import { ASTRAASAN_DATA } from '../constants';
import { signinUser, signupUser } from '@/lib/requests/api-requests';
import { iAuthResponse, iSignIn, iSignUp } from '@/lib/interfaces/auth.interface';

export default function useAuth() {
  const router = useRouter();
  const { saveStore } = useStore();

  const signUp = async (data: iSignUp) => {
    const response: iAuthResponse = await signupUser(data);

    await saveStore(ASTRAASAN_DATA, JSON.stringify(response));

    router.replace('/dashboard');
  };

  const signIn = async (data: iSignIn) => {
    const response: iAuthResponse = await signinUser(data);

    await saveStore(ASTRAASAN_DATA, JSON.stringify(response));

    router.replace('/dashboard');
  };

  return { signUp, signIn };
}
