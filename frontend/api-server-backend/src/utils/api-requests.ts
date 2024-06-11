import api from './baseApi';
import { iAuthResponse } from '@/app/lib/interfaces/auth.interface';

export async function signinUser(body: {
  email: string;
  password: string;
}): Promise<iAuthResponse> {
  return api({ method: 'POST', route: '/api/auth/sign-in/v1', body });
}

export async function signupUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<iAuthResponse> {
  return api({ method: 'POST', route: '/api/auth/sign-up/v1', body });
}
