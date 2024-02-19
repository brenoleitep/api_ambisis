import { compareSync, hashSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validation';
import { prisma } from '../server';

export default {
  async signup (request: Request, response: Response, next: NextFunction) {
    try {
            
      const {email, password, name} = request.body;
      
      let user = await prisma.user.findFirst({where: {email}});
      
      if (user) {
        next(new BadRequestsException('Usuário já cadastrado!', ErroCode.USER_ALREADY_EXISTS)); 
      }

      user = await prisma.user.create({
        data:{
          name,
          email,
          password: hashSync(password, 10)
        }
      });
    
      response.json(user);
    } catch (error) {
      next(new UnprocessableEntity(error?.issue, 'Unprocessable entity', ErroCode.UNPROCESSABLE_ENTITY));
    }
  },
  
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      next(new BadRequestsException('Usuário não existe!', ErroCode.USER_NOT_FOUND)); 
    }

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      next(new BadRequestsException('Senha ou usuários incorretos!', ErroCode.INCORRECT_PASSWORD)); 
    }

    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET);

    console.log(user, token);

    response.json({ user, token });

  }

};