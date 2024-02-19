import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import authRoutes from './auth';
import companieRoutes from './companies';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/', verifyToken, companieRoutes);

export default rootRouter;