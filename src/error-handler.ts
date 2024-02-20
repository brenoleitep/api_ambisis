import { NextFunction, Request, Response } from 'express';
import { InternalException } from './exceptions/internal-exception';
import { ErroCode, HttpException } from './exceptions/root';

export const errorHandler = (method) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      method(req, res, next);
    } catch (error) {
      let exception: HttpException;
      if(error instanceof HttpException){
        exception = error;
      } else {
        exception = new InternalException('Algo deu errado', error, ErroCode.INTERNAL_EXCEPTION);
      }
      next(exception);
    }
  };
};