import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import authRoutes from './auth';
import companieRoutes from './companies';
import licenseRouter from './licenses';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/companie', verifyToken, companieRoutes);
rootRouter.use('/license', verifyToken, licenseRouter);

export default rootRouter;