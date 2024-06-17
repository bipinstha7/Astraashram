import { User } from '../users/users.entity';

export type iSignin = Pick<User, 'name' | 'email'> & {
  cookie: string;
};

export type iFindUserResult = Partial<Pick<User, 'id' | 'name' | 'email' | 'password'>>;
