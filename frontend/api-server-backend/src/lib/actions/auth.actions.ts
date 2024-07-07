'use server';
import { redirect } from 'next/navigation';

import {
  signJWT,
  setCookie,
  customError,
  formatError,
  hashPassword,
  comparePassword,
} from '../helper';
import database from '../db';
import { iResponse, iSignUp } from '../interfaces/auth.interface';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';
import { DASHBOARD_ROUTE, SOMETHING_WENT_WRONG } from '../constants';

export async function signIn(
  previousState: unknown,
  formData: FormData
): Promise<iResponse | void> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const schemaResult = await signInSchema.safeParseAsync({ email, password });

    if (!schemaResult.success) {
      return { errors: await formatError(schemaResult.error.issues) };
    }

    const db = await database();

    const { rows: findUser } = await db.execute({
      sql: 'SELECT id, password FROM users WHERE email=?',
      args: [schemaResult.data.email],
    });

    if (!findUser.length) {
      return customError('Invalid email or password');
    }

    const passwordMatch = await comparePassword(password, findUser[0].password as string);

    if (!passwordMatch) {
      return customError('Invalid email or password');
    }

    const tokenData = {
      id: findUser[0].id,
      name: findUser[0].name,
      email: findUser[0].email,
    };

    const token = await signJWT(tokenData);

    setCookie(token);
  } catch (error) {
    console.log({ signInError: error });
    return customError(SOMETHING_WENT_WRONG);
  }

  /* redirect internally throws an error so it should be called outside of try/catch blocks. */
  redirect(DASHBOARD_ROUTE);
}

export async function signUp(previousState: unknown, data: iSignUp): Promise<iResponse> {
  try {
    const schemaResult = await signUpSchema.safeParseAsync(data);

    if (!schemaResult.success) {
      return { errors: await formatError(schemaResult.error.issues) };
    }

    const hashedPassword = await hashPassword(schemaResult.data.password);
    const payload = { ...schemaResult.data, password: hashedPassword };

    const db = await database();

    const { rows } = await db.execute({
      sql: 'SELECT id FROM users WHERE email=?',
      args: [payload.email],
    });

    if (rows.length) {
      return customError('Email already exists');
    }

    const { lastInsertRowid } = await db.execute({
      sql: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      args: [payload.name, payload.email, payload.password],
    });

    const { rows: getInsertedUser } = await db.execute({
      sql: 'SELECT id FROM users WHERE id=?',
      args: [lastInsertRowid!],
      // the ! -> It tells TypeScript that even though something looks like it could be null, it can trust you that it's not
    });

    const tokenData = {
      name: payload.name,
      email: payload.email,
      id: getInsertedUser[0].id,
    };

    const token = await signJWT(tokenData);

    setCookie(token);
  } catch (error) {
    console.log({ signUpError: error });
    return customError(SOMETHING_WENT_WRONG);
  }

  /* redirect internally throws an error so it should be called outside of try/catch blocks. */
  redirect(DASHBOARD_ROUTE);
}
