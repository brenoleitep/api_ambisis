import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import * as userService from '../services/userService';

export async function signup(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, password, name } = request.body;
    const newUser = await userService.signup(email, password, name);
      
    return response.status(httpStatus.CREATED).json({ data: newUser });
  } catch (error) {
    next(error);
  }
}

export async function login(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, password } = request.body;
    const { user, token } = await userService.login(email, password);

    return response.status(httpStatus.CREATED).json({ user, token });
  } catch (error) {
    next(error);
  }
}