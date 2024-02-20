import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const companyRoutes = Router();

companyRoutes.post('/createCompany', CompanyController.createCompany);
companyRoutes.get('/listCompany', CompanyController.listCompany);
companyRoutes.put('/updateCompany/:id', CompanyController.updateCompany);
companyRoutes.delete('/deleteCompany/:id', CompanyController.deleteCompany);


export default companyRoutes;