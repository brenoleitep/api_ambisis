import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Express, Request, Response, json } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { PORT } from '../secrets';
import { errorMiddleware } from '../src/middleware/errors';
import rootRouter from './routes';
import swaggerDocs from './swagger.json';

export const app:Express = express();

app.use(cors());
app.use(json());

export const prisma = new PrismaClient();

app.use('/api', rootRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'Hello Brene' });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

