import { HttpException } from './root';

export class UnprocessableEntity extends HttpException {
  constructor(error: string, message: string, errorCode: number){
    super(message, errorCode, 422, error);
  }
}