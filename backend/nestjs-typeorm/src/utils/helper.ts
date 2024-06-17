import bcrypt from 'bcrypt';
import { Request } from 'express';

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const setCookie = ({
  req,
  cookie,
  expireHour,
}: {
  req: Request;
  cookie: string;
  expireHour: number;
}) => {
  req.res.cookie('access_token', cookie, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + expireHour * 60 * 60 * 1000),
  });
};
