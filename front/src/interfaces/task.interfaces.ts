export interface IUserTaskForm {
  userId: number;
  dateOfExecution: Date;
  description: string;
}

export interface IUserTaskFilter {
  description?: string;
  page: number;
  perPage: number;
}

export interface IUserTask {
  id: number;
  userId: number;
  dateOfExecution: Date;
  description: string;
  userModify?: string;
  dateModify?: Date;
  userCreate?: string;
  dateCreate?: Date;
}
