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
  INVALID_CREDENTIALS = 1004,
  COMPANY_ALREADY_EXISTS = 2001, 
  COMPANY_NOT_FOUND = 2002, 
  INTERNAL_EXCEPTION = 3001,
  LICENSE_NOT_FOUND = 4001,
  DUPLICATE_LICENSE = 5001,
  INVALID_DATA = 6001,
  INVALID_DATE_FORMAT = 6002,
  INVALID_LICENSE_ID = 7001,
}