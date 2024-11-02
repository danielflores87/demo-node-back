import { IUser } from '../entities/user.entity';

export interface IAuthUser {
  user: IUser;
  token: string;
}
