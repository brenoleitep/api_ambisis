import { ErroCode, HttpException } from './root';

export class BadRequestsException extends HttpException {
  constructor(message: string, errorCode?: ErroCode) {
    super(message, errorCode, 400, null ); 
  }
}