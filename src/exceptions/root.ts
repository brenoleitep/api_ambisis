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
}