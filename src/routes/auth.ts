import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { errorHandler } from '../error-handler';

const authRoutes = Router();

authRoutes.post('/cadastro', errorHandler(AuthController.signup)); 
authRoutes.post('/login', errorHandler(AuthController.login)); 

export default authRoutes;