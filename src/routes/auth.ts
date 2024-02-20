import { Router } from 'express';
import { login, signup } from '../controllers/AuthController';
import { errorHandler } from '../error-handler';

const authRoutes = Router();

authRoutes.post('/cadastro', errorHandler(signup)); 
authRoutes.post('/login', errorHandler(login)); 

export default authRoutes;