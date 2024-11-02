export interface IUser {
  id: number;
  numberDocument: string;
  name: string;
  email: string;
  password?: string;
  userModify?: string;
  dateModify?: Date;
  userCreate?: string;
  dateCreate?: Date;
}

export interface IUserForm {
  numberDocument: string;
  name: string;
  email: string;
}

export interface IUserFilter {
  name?: string;
  email?: string;
  perPage: number;
  page: number;
}
