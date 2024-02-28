import { compareSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { LoginSchema, SignUpSchema } from '../schema/users';
import { prisma } from '../server';

export async function signup(email: string, password: string, name: string) {
  SignUpSchema.parse({ email, password, name });

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    throw new BadRequestsException('Usuário já cadastrado', ErroCode.USER_ALREADY_EXISTS);
  }

  const hashedPassword = hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return newUser;
}

export async function login(email: string, password: string) {
  LoginSchema.parse({ email, password });
  const user = await prisma.user.findFirst({ where: { email } });
  const passwordMatch = compareSync(password, user.password);

  if (!passwordMatch) {
    throw new BadRequestsException('Usuário ou senha incorretos');
  }

  if (!user) {
    throw new BadRequestsException('Usuário ou senha incorretos');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return { user, token };
}