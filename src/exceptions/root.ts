export class HttpException extends Error {
  message: string;
  errorCode: ErroCode;
  statusCode: number;
  errors: string;

  constructor(message: string, errorCode: ErroCode, statusCode: number, errors: string) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErroCode { 
  USER_NOT_FOUND = 1001, 
  USER_ALREADY_EXISTS = 1002, 
  INCORRECT_PASSWORD = 1003, 
  COMPANY_ALREADY_EXISTS = 1004, 
  COMPANY_NOT_FOUND = 1005, 
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001
}