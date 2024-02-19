import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';
import { PORT } from '../secrets';
import CompanyController from './controllers/CompanyController';
import { errorMiddleware } from './middleware/errors';
import verifyToken from './middleware/verifyToken';
import rootRouter from './routes';

const app:Express = express();

app.use(express.json());

export const prisma = new PrismaClient();

app.use('/api', rootRouter);

app.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'Hello Brene' });
});

app.post('/createCompany', CompanyController.createCompany);
app.get('/listCompany', CompanyController.listCompany);
app.put('/updateCompany/:id', CompanyController.updateCompany);
app.delete('/deleteCompany/:id', verifyToken, CompanyController.deleteCompany);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Server is running');
});