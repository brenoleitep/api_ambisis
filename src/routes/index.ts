import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import authRoutes from './auth';
import companyRoutes from './company';
import licenseRouter from './licenses';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/company', verifyToken, companyRoutes);
rootRouter.use('/license', verifyToken, licenseRouter);

export default rootRouter;