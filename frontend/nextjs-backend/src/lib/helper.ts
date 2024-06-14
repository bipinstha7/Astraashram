'use server';
/**
 * use server makes the functions Promise. so whenever any function are called we need to do it with await.
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ZodIssue } from 'zod';
import { izodResponse } from './interfaces/auth.interface';
import { cookies } from 'next/headers';
import { CUSTOM_ERROR } from './constants';

export const formatError = (errors: ZodIssue[]): izodResponse => {
  if (!errors?.length) throw 'Array argument is required';

  return errors.map(error => ({ message: error.message, path: error.path }));
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const signJWT = async (data: object) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  return jwt.sign({ data }, jwtSecretKey, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

export const verifyJWT = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};

export const setCookie = (data: string) => cookies().set('authorization', data);

export const customError = (message: string) => {
  return { errors: [{ path: [CUSTOM_ERROR], message }] };
};
