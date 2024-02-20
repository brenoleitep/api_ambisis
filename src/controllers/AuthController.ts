import { compareSync, hashSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { LoginSchema, SignUpSchema } from '../schema/users';
import { prisma } from '../server';


export default {
  async signup (request: Request, response: Response, next: NextFunction) {
    SignUpSchema.parse(request.body);

    const {email, password, name} = request.body;
      
    let user = await prisma.user.findFirst({where: {email}});
      
    if (user) {
      next(new BadRequestsException('Usuário já cadastrado', ErroCode.USER_ALREADY_EXISTS));
    }  

    user = await prisma.user.create({
      data:{
        name,
        email,
        password: hashSync(password, 10)
      }
    });
    
    return response.status(httpStatus.CREATED).json({
      data: user
    });
  },
  
  async login(request: Request, response: Response, next: NextFunction) {
    LoginSchema.parse(request.body);
   
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      next(new BadRequestsException('Usuário não encontrado', ErroCode.USER_NOT_FOUND));
    }

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      next(new BadRequestsException('Usuário ou senha incorretos', ErroCode.USER_NOT_FOUND));
    }

    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET);

    console.log(user, token);

    return response.status(httpStatus.CREATED).json({
      user, token
    });  
  }
};