export enum EResponseCodes {
  OK = "OK",
  WARN = "WARN",
  FAIL = "FAIL",
  ASK = "ASK",
}

export class ApiResponse<T> {
  data: T;
  total?: number;
  operation: {
    code: EResponseCodes;
    message: string;
  };

  constructor(data: T, code: EResponseCodes, message?: string, total?: number) {
    this.data = data;
    this.operation = { code, message: message ?? "Success" };
    this.total = total;
  }
}
