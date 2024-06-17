import { User } from './users.entity';

export interface iFindUser {
  query: any;
  select?: Partial<keyof User>[];
}
