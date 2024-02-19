import { compareSync, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secrets';
import { LoginSchema, SignUpSchema } from '../schema/users';
import { prisma } from '../server';

export default {
  async signup (request: Request, response: Response) {
    SignUpSchema.parse(request.body);

    const {email, password, name} = request.body;
      
    let user = await prisma.user.findFirst({where: {email}});
      
    if (user) {
      return response.status(400).json({
        message: 'Usuário já cadastrado'
      });  
    }  

    user = await prisma.user.create({
      data:{
        name,
        email,
        password: hashSync(password, 10)
      }
    });
    
    response.json(user);

  },
  
  async login(request: Request, response: Response) {
    LoginSchema.parse(request.body);
   
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return response.status(400).json({
        message: 'Usuário não existe'
      });      }

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      return response.status(400).json({
        message: 'Senha ou usuário incorretos'
      });      }

    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET);

    console.log(user, token);

    response.json({ user, token });

  }

};