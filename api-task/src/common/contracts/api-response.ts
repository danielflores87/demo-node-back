import { EResponseCodes } from './api.enums';

export class ApiResponse<T> {
  data: T;
  total?: number;
  operation: {
    code: EResponseCodes;
    message?: string;
  };

  constructor(data: T, code: EResponseCodes, message?: string, total?: number) {
    this.data = data;
    this.operation = {
      code,
      message: message ?? 'Operación realizada con exito',
    };
    this.total = total;
  }
}
