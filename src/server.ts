import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';
import { PORT } from '../secrets';
import { errorMiddleware } from './middleware/errors';
import rootRouter from './routes';

const app:Express = express();

app.use(express.json());

export const prisma = new PrismaClient();

app.use('/api', rootRouter);

app.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'Hello Brene' });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Server is running');
});