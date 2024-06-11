import { UserDocument } from '../users/users.schema';

export type iSignin = Pick<UserDocument, 'name' | 'email'> & {
  cookie: string;
};
